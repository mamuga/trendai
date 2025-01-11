import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {CreateUser, Role, UpdateUser, UserProfile} from '@repo/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(userData: CreateUser): Promise<UserProfile> {
        // Check if the user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create the user
        const user = await this.prisma.user.create({
            data: {
                name: userData.name, // Required
                email: userData.email, // Required
                password: hashedPassword, // Hashed password
                role: userData.role, // Required
            },
        });

        // Create role-specific profile
        if (user.role === Role.INFLUENCER) {
            await this.prisma.influencer.create({
                data: {
                    userId: user.id,
                },
            });
        } else if (user.role === Role.BRAND) {
            await this.prisma.brand.create({
                data: {
                    userId: user.id,
                },
            });
        }

        // Exclude password from the response
        const { password, ...userProfile } = user;
        return userProfile as UserProfile; // Type assertion to UserProfile
    }

    async findById(id: string): Promise<UserProfile> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                influencer: true,
                brand: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found'); // Handle case where user is not found
        }

        const { password, ...userProfile } = user; // Exclude password from the profile
        return userProfile as UserProfile; // Type assertion to UserProfile
    }

    async update(id: string, updateData: UpdateUser): Promise<UserProfile> {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                influencer: true,
                brand: true,
            },
        });

        const { password, ...userProfile } = user; // Exclude password from the profile
        return userProfile as UserProfile; // Type assertion to UserProfile
    }
}
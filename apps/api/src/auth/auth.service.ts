import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginCredentials, AuthResponse } from '@repo/shared';
import { Role } from '@repo/shared';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
    sub: string;        // userId (using 'sub' is a JWT convention)
    email: string;
    name: string;
    role: Role;
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: credentials.email }
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Create JWT payload with necessary user information
        const payload: JwtPayload = {
            sub: user.id,          // userId as 'sub'
            email: user.email,
            name: user.name,
            role: user.role as Role
        };

        // Generate token with complete payload
        const token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role as Role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token
        };
    }
}
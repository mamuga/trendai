import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginCredentials, AuthResponse } from '@repo/shared';
import * as bcrypt from 'bcrypt';
import { Role } from '@repo/shared';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role as Role,
                createdAt: user.createdAt,
            },
            token,
        };
    }
}

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginCredentials, ApiResponse, AuthResponse } from '@repo/shared';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        const result = await this.authService.login(credentials);
        return {
            data: result,
            message: 'Login successful',
        };
    }
}

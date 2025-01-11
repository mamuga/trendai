import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    UseGuards,
    Request
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UserService} from "./user.service.js";
import { CreateUser, UpdateUser, UserProfile, ApiResponse } from '@repo/shared';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    async create(@Body() userData: CreateUser): Promise<ApiResponse<UserProfile>> {
        const user = await this.usersService.create(userData);
        return {
            data: user,
            message: 'User created successfully',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<ApiResponse<UserProfile>> {
        const user = await this.usersService.findById(req.user.id);
        return {
            data: user,
            message: 'Profile retrieved successfully',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(
        @Request() req,
        @Body() updateData: UpdateUser
    ): Promise<ApiResponse<UserProfile>> {
        const user = await this.usersService.update(req.user.id, updateData);
        return {
            data: user,
            message: 'Profile updated successfully',
        };
    }
}

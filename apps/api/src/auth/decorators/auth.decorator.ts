import { applyDecorators, UseGuards } from '@nestjs/common';
import { CustomAuthGuard } from '../guards/auth.guard.js';
import { RoleGuard } from '../guards/role.guard.js';
import { Roles } from './role.decorator.js';
import { Role } from '@repo/shared';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(CustomAuthGuard, RoleGuard)
    );
}
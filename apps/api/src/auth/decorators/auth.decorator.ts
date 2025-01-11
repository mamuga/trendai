import { applyDecorators, UseGuards } from '@nestjs/common';
import { CustomAuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from './role.decorator';
import { Role } from '@repo/shared';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(CustomAuthGuard, RoleGuard)
    );
}
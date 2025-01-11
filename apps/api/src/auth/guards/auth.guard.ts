import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid token');
        }

        if (err || !user) {
            throw new UnauthorizedException(err?.message || 'Unauthorized');
        }

        return user;
    }
}
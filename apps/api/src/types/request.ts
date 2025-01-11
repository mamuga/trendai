import { Request } from 'express';
import { UserProfile } from '@repo/shared';

export interface AuthenticatedRequest extends Request {
    user: UserProfile;
}
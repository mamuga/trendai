import { z } from 'zod';
import { Role } from '../enums';
import { type Influencer } from './influencer';
import { type Brand } from './brand';

// Base user schema
export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string(), // Hashed password in responses
    role: z.enum([Role.INFLUENCER, Role.BRAND]),
    createdAt: z.date(),
    updatedAt: z.date()
});

// Schema for creating a new user
export const createUserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    role: z.enum([Role.INFLUENCER, Role.BRAND])
});

// Schema for updating user information
export const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .optional()
});

// Schema for user profile response (excludes password)
export const userProfileSchema = userSchema.omit({ password: true }).extend({
    influencer: z.object({}).nullable(),
    brand: z.object({}).nullable()
});

// Types derived from schemas
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;

// Response type for user with role-specific profile
export type UserWithProfile = {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    influencer: Influencer | null;
    brand: Brand | null;
};

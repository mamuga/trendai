import { z } from 'zod';
import { Role} from "../enums/index.js";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    role: z.enum([Role.INFLUENCER, Role.BRAND]),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const loginCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const authResponseSchema = z.object({
    user: userSchema,
    token: z.string()
});

export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
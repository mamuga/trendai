import { z } from 'zod';
import { Role } from "../enums/index.js";

// Base user schema with all fields including password
export const userSchemaWithPassword = z.object({
    id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum([Role.INFLUENCER, Role.BRAND]),
    createdAt: z.date(),
    updatedAt: z.date()
});

// User schema without password for API responses
export const userSchema = userSchemaWithPassword.omit({ password: true });

export const loginCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const authResponseSchema = z.object({
    user: userSchema,
    token: z.string()
});

// Types
export type UserWithPassword = z.infer<typeof userSchemaWithPassword>;
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
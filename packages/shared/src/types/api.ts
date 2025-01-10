import { z } from 'zod';

export const apiResponseSchema = <T extends z.ZodType>(schema: T) =>
    z.object({
        data: schema,
        message: z.string()
    });

export type ApiResponse<T> = {
    data: T;
    message: string;
};
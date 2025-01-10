import {z} from "zod";

export const brandSchema = z.object({
    id: z.string(),
    userId: z.string(),
    campaigns: z.array(z.string()).optional() // Array of campaign IDs
});

export type Brand = z.infer<typeof brandSchema>;
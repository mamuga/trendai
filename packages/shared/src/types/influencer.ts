import {z} from "zod";

export const influencerSchema = z.object({
    id: z.string(),
    userId: z.string(),
    campaigns: z.array(z.string()).optional(), // Array of campaign IDs
    submissions: z.array(z.string()).optional() // Array of submission IDs
});

export type Influencer = z.infer<typeof influencerSchema>;
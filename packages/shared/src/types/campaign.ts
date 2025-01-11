import { z } from 'zod';
import { CampaignStatus} from "../enums/index.js";

export const campaignSchema = z.object({
    id: z.string(),
    title: z.string().min(3).max(100),
    description: z.string().min(10),
    requirements: z.array(z.string()),
    reward: z.number().positive(),
    status: z.enum([CampaignStatus.ACTIVE, CampaignStatus.COMPLETED, CampaignStatus.PENDING]),
    deadline: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    brandId: z.string(),
    submissionCount: z.number().optional()
});

export const createCampaignSchema = campaignSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    status: true,
    submissionCount: true
});

export type Campaign = z.infer<typeof campaignSchema>;
export type CreateCampaign = z.infer<typeof createCampaignSchema>;
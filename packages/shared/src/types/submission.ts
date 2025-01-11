import { z } from 'zod';
import { SubmissionStatus} from "../enums/index.js";

// These match the exports
export const contentDataSchema = z.object({
    platform: z.enum(['TIKTOK', 'INSTAGRAM']),
    link: z.string().url()
});

export const metricsSchema = z.object({
    likes: z.number().min(0),
    shares: z.number().min(0),
    comments: z.number().min(0)
});

export const submissionSchema = z.object({
    id: z.string(),
    campaignId: z.string(),
    influencerId: z.string(),
    content: contentDataSchema,
    status: z.nativeEnum(SubmissionStatus),
    metrics: metricsSchema.optional(),
    submittedAt: z.date(),
    updatedAt: z.date()
});


export const createSubmissionSchema = z.object({
    campaignId: z.string(),
    influencerId: z.string(), 
    content: contentDataSchema
});

// Types that match the exports
export type ContentData = z.infer<typeof contentDataSchema>;
export type Metrics = z.infer<typeof metricsSchema>;
export type Submission = z.infer<typeof submissionSchema>;
export type CreateSubmission = z.infer<typeof createSubmissionSchema>;
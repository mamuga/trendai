import { z } from 'zod';
import { SubmissionStatus } from '../enums';

export const contentDataSchema = z.object({
    platform: z.enum(['TIKTOK', 'INSTAGRAM']),
    link: z.string().url()
});

export const metricsSchema = z.object({
    likes: z.number().nonnegative(),
    shares: z.number().nonnegative(),
    comments: z.number().nonnegative()
});

export const submissionSchema = z.object({
    id: z.string(),
    campaignId: z.string(),
    influencerId: z.string(),
    content: contentDataSchema,
    status: z.enum([SubmissionStatus.PENDING, SubmissionStatus.APPROVED, SubmissionStatus.REJECTED]),
    metrics: metricsSchema.optional(),
    submittedAt: z.date(),
    updatedAt: z.date()
});

export const createSubmissionSchema = submissionSchema.omit({
    id: true,
    status: true,
    metrics: true,
    submittedAt: true,
    updatedAt: true
});

export type Submission = z.infer<typeof submissionSchema>;
export type CreateSubmission = z.infer<typeof createSubmissionSchema>;
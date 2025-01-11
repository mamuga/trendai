import {
    Role,
    CampaignStatus,
    SubmissionStatus,
    Campaign,
    Submission,
    UserProfile
} from '@repo/shared';
import { PrismaClient, Prisma } from '@repo/db';

// Type aliases for Prisma model types
type PrismaCampaign = Prisma.CampaignGetPayload<{}>;
type PrismaSubmission = Prisma.SubmissionGetPayload<{}>;
type PrismaUser = Prisma.UserGetPayload<{}>;

export const convertPrismaRole = (role: any): Role => role as Role;
export const convertPrismaCampaignStatus = (status: any): CampaignStatus => status as CampaignStatus;
export const convertPrismaSubmissionStatus = (status: any): SubmissionStatus => status as SubmissionStatus;

export const convertPrismaCampaign = (campaign: PrismaCampaign & { submissions?: any[] }): Campaign => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    requirements: campaign.requirements,
    reward: campaign.reward,
    status: convertPrismaCampaignStatus(campaign.status),
    deadline: campaign.deadline,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    brandId: campaign.brandId,
    submissionCount: campaign.submissions?.length || 0
});

export const convertPrismaSubmission = (submission: PrismaSubmission): Submission => ({
    id: submission.id,
    campaignId: submission.campaignId,
    influencerId: submission.influencerId,
    content: submission.content as { platform: 'TIKTOK' | 'INSTAGRAM'; link: string },
    status: convertPrismaSubmissionStatus(submission.status),
    metrics: submission.metrics,
    submittedAt: submission.submittedAt,
    updatedAt: submission.updatedAt
});

export const convertPrismaUser = (user: PrismaUser): UserProfile => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: convertPrismaRole(user.role),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    influencer: null,
    brand: null
});
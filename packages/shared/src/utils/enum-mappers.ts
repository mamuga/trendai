import { CampaignStatus, SubmissionStatus } from '@repo/db';

export const mapSharedToPrismaStatus = (status: CampaignStatus): CampaignStatus => {
    return status;
};

export const mapSharedToPrismaSubmissionStatus = (status: SubmissionStatus): SubmissionStatus => {
    return status;
};
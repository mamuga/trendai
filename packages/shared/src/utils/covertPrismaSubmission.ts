import { Submission } from '../types/submission'; 
import { SubmissionStatus } from '../enums';

export const convertPrismaSubmission = (submission): Submission => {
    return {
        id: submission.id,
        campaignId: submission.campaignId,
        influencerId: submission.influencerId,
        content: {
            platform: submission.content.platform,
            link: submission.content.link
        },
        status: submission.status as SubmissionStatus,
        metrics: submission.metrics,
        submittedAt: submission.submittedAt,
        updatedAt: submission.updatedAt
    };
};
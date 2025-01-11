import { Submission } from '../types/submission.js';
import { SubmissionStatus} from "../enums/index.js";

export const convertPrismaSubmission = (submission: {
  id: any;
  campaignId: any;
  influencerId: any;
  content: { platform: any; link: any };
  status: string;
  metrics: any;
  submittedAt: any;
  updatedAt: any;
}): Submission => {
  return {
    id: submission.id,
    campaignId: submission.campaignId,
    influencerId: submission.influencerId,
    content: {
      platform: submission.content.platform,
      link: submission.content.link,
    },
    status: submission.status as SubmissionStatus,
    metrics: submission.metrics,
    submittedAt: submission.submittedAt,
    updatedAt: submission.updatedAt,
  };
};
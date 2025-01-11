export const CampaignStatus = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    PENDING: 'PENDING'
} as const;

export type CampaignStatus = typeof CampaignStatus[keyof typeof CampaignStatus];

export const SubmissionStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
} as const;

export type SubmissionStatus = typeof SubmissionStatus[keyof typeof SubmissionStatus];

export const Role = {
    INFLUENCER: 'INFLUENCER',
    BRAND: 'BRAND'
  } as const;
  
export type Role = typeof Role[keyof typeof Role];

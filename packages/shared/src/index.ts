// User & Auth Types
export type {
    CreateUser,
    UpdateUser,
    UserProfile,
    UserWithProfile,
} from './types/user.js';

export type {
    LoginCredentials,
    AuthResponse
} from './types/auth.js';

// Main Entity Types
export type {
    Campaign,
    CreateCampaign,
} from './types/campaign.js';

export type {
    Submission,
    CreateSubmission,
    ContentData,
    Metrics
} from './types/submission.js';

export type {
    Influencer,
} from './types/influencer.js';

export type {
    Brand
} from './types/brand.js';

export type {
    ApiResponse
} from './types/api.js';

// Schema Exports
export {
    createUserSchema,
    updateUserSchema,
    userProfileSchema,
} from './types/user.js';

export {
    loginCredentialsSchema,
    authResponseSchema
} from './types/auth.js';

export {
    campaignSchema,
    createCampaignSchema,
} from './types/campaign.js';

export {
    submissionSchema,
    createSubmissionSchema,
    contentDataSchema,
    metricsSchema
} from './types/submission.js';

// Enum Exports
export { Role, CampaignStatus, SubmissionStatus } from './enums/index.js';

export { mapSharedToPrismaStatus } from './utils/enum-mappers.js';

export { convertPrismaSubmission } from './utils/covertPrismaSubmission.js';

export type Platform = 'TIKTOK' | 'INSTAGRAM';

export {
    mapPlatformToPrisma,
    mapPrismaToPlatform
} from './utils/mapPlatformToPrisma.js';

export {
    mapSharedToPrismaSubmissionStatus,
    mapPrismaToSharedSubmissionStatus
} from './utils/enumMapping.js';

export { z } from 'zod';
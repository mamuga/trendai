// User & Auth Types
export type {
    CreateUser,
    UpdateUser,
    UserProfile,
    UserWithProfile,
} from './types/user';

export type {
    LoginCredentials,
    AuthResponse
} from './types/auth';

// Main Entity Types
export type {
    Campaign,
    CreateCampaign,
} from './types/campaign';

export type {
    Submission,
    CreateSubmission,
    ContentData,  // Add this for submission content
    Metrics      // Add this for submission metrics
} from './types/submission';

export type {
    Influencer,
} from './types/influencer';

export type {
    Brand
} from './types/brand';

export type {
    ApiResponse
} from './types/api';

// Schema Exports
export {
    createUserSchema,
    updateUserSchema,
    userProfileSchema,
} from './types/user';

export {
    loginCredentialsSchema,
    authResponseSchema
} from './types/auth';

export {
    campaignSchema,
    createCampaignSchema,
} from './types/campaign';

export {
    submissionSchema,
    createSubmissionSchema,
    contentDataSchema,  // Add this for content validation
    metricsSchema      // Add this for metrics validation
} from './types/submission';

// Enum Exports
export { Role, CampaignStatus, SubmissionStatus } from './enums';

export { mapSharedToPrismaStatus } from './utils/enum-mappers';

export {convertPrismaSubmission} from './utils/covertPrismaSubmission'

export type Platform = 'TIKTOK' | 'INSTAGRAM';

export { mapPlatformToPrisma, mapPrismaToPlatform } from './utils/mapPlatformToPrisma';

export { mapSharedToPrismaSubmissionStatus, mapPrismaToSharedSubmissionStatus } from './utils/enumMapping';

export { z } from 'zod';
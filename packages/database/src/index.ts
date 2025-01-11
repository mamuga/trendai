import { PrismaClient, Prisma as PrismaNamespace } from "./generated/client/index.js";

export { PrismaClient };

export { PrismaNamespace as Prisma };

export type * from "./generated/client/index.js";

export type {
    Role,
    CampaignStatus,
    SubmissionStatus,
    ContentData,
    Metrics
} from "./generated/client/index.js";
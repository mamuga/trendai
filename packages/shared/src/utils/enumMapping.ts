import { P } from '@repo/db';
import { SubmissionStatus as SharedSubmissionStatus } from '../enums';

export function mapSharedToPrismaSubmissionStatus(status: SharedSubmissionStatus): P.SubmissionStatus {
    return status as unknown as P.SubmissionStatus;
}

export function mapPrismaToSharedSubmissionStatus(status: P.SubmissionStatus): SharedSubmissionStatus {
    return status as unknown as SharedSubmissionStatus;
}
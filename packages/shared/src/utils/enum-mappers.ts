import { SubmissionStatus as SharedSubmissionStatus } from "../enums";
import { P } from '@repo/db';

export const mapSharedToPrismaStatus = (sharedStatus: SharedSubmissionStatus): P.SubmissionStatus => {
    switch (sharedStatus) {
        case SharedSubmissionStatus.PENDING:
            return P.SubmissionStatus.PENDING;
        case SharedSubmissionStatus.APPROVED:
            return P.SubmissionStatus.APPROVED;
        case SharedSubmissionStatus.REJECTED:
            return P.SubmissionStatus.REJECTED;
        default:
            throw new Error(`Unknown shared status: ${sharedStatus}`);
    }
};
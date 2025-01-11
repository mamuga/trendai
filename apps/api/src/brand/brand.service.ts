import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
    mapPrismaToSharedSubmissionStatus,
    mapSharedToPrismaSubmissionStatus,
    SubmissionStatus as SharedSubmissionStatus,
    Submission,
    mapPlatformToPrisma,
    mapPrismaToPlatform,
    Platform
} from '@repo/shared';


@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) {}

    async getCampaignInfluencers(campaignId: string) {
        return this.prisma.campaignInfluencer.findMany({
            where: { campaignId },
            include: {
                influencer: {
                    include: {
                        submissions: {
                            where: { campaignId }
                        }
                    }
                }
            }
        });
    }

    async updateSubmissionStatus(submissionId: string, status: SharedSubmissionStatus): Promise<Submission> {
        const submission = await this.prisma.submission.findUnique({
            where: { id: submissionId },
        });

        if (!submission) {
            throw new NotFoundException('Submission not found');
        }

        const prismaStatus = mapSharedToPrismaSubmissionStatus(status);

        const updatedSubmission = await this.prisma.submission.update({
            where: { id: submissionId },
            data: {
                status: prismaStatus,
                content: submission.content
            },
        });

        return {
            ...updatedSubmission,
            status: mapPrismaToSharedSubmissionStatus(updatedSubmission.status),
            content: {
                platform: mapPrismaToPlatform(updatedSubmission.content.platform as Platform),
                link: updatedSubmission.content.link
            }
        };
    }
}
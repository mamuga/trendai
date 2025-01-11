import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSubmission, Submission } from '@repo/shared';
import { convertPrismaSubmission } from '../utils/type-converters.js';

@Injectable()
export class SubmissionService {
    constructor(private prisma: PrismaService) {}

    async create(createSubmissionDto: CreateSubmission): Promise<Submission> {
        const submission = await this.prisma.submission.create({
            data: {
                campaignId: createSubmissionDto.campaignId,
                influencerId: createSubmissionDto.influencerId,
                content: {
                    platform: createSubmissionDto.content.platform,
                    link: createSubmissionDto.content.link
                },
                status: 'PENDING'
            }
        });

        return convertPrismaSubmission(submission);
    }

    async updateStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<Submission> {
        const submission = await this.prisma.submission.update({
            where: { id },
            data: { status }
        });

        return convertPrismaSubmission(submission);
    }
}
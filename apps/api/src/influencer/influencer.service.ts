import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmission } from '@repo/shared';

@Injectable()
export class InfluencerService {
    constructor(private prisma: PrismaService) {}

    async getJoinedCampaigns(userId: string) {
        const influencer = await this.prisma.influencer.findFirst({
            where: { userId }
        });

        return this.prisma.campaign.findMany({
            where: {
                influencers: {
                    some: {
                        influencerId: influencer.id
                    }
                }
            },
            include: {
                submissions: true
            }
        });
    }

    async submitContent(userId: string, campaignId: string, contentData: CreateSubmission) {
        const influencer = await this.prisma.influencer.findFirst({
            where: { userId }
        });

        if (!influencer) {
            throw new NotFoundException('Influencer not found');
        }

        return this.prisma.submission.create({
            data: {
                campaignId,
                influencerId: influencer.id,
                status: 'PENDING',
                content: {
                    platform: contentData.content.platform,
                    link: contentData.content.link
                }
            }
        });
    }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Campaign } from '@repo/shared';

@Injectable()
export class CampaignService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string): Promise<Campaign> {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: {
                submissions: true,
                influencers: true,
            },
        });

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        return {
            id: campaign.id,
            title: campaign.title,
            description: campaign.description,
            requirements: campaign.requirements,
            reward: campaign.reward,
            status: campaign.status,
            deadline: campaign.deadline,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
            brandId: campaign.brandId,
            submissionCount: campaign.submissions.length
        };
    }

    async getCampaignInfluencers(id: string) {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: {
                influencers: {
                    include: {
                        influencer: {
                            include: {
                                user: true,
                                submissions: {
                                    where: { campaignId: id }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        return campaign.influencers.map(ci => ({
            id: ci.influencer.id,
            userId: ci.influencer.userId,
            user: ci.influencer.user,
            submissions: ci.influencer.submissions
        }));
    }
}
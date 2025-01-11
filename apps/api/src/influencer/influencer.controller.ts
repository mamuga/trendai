import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { InfluencerService } from './influencer.service.js';
import { Campaign, CreateSubmission, ApiResponse } from '@repo/shared';
import { AuthenticatedRequest } from '../types/request.js';
import { convertPrismaCampaign } from '../utils/type-converters.js';
import { convertPrismaSubmission } from '@repo/shared' 

@Controller('influencers')
@UseGuards(JwtAuthGuard)
export class InfluencerController {
    constructor(private readonly influencerService: InfluencerService) {}

    @Get('campaigns')
    async getJoinedCampaigns(@Req() req: AuthenticatedRequest): Promise<ApiResponse<Campaign[]>> {
        const prismaResults = await this.influencerService.getJoinedCampaigns(req.user.id);
        const campaigns = prismaResults.map(convertPrismaCampaign);

        return {
            data: campaigns,
            message: 'Joined campaigns retrieved successfully'
        };
    }

    @Post('campaigns/:campaignId/submit')
    async submitContent(
        @Req() req: AuthenticatedRequest,
        @Param('campaignId') campaignId: string,
        @Body() contentData: CreateSubmission
    ) {
        const submission = await this.influencerService.submitContent(
            req.user.id,
            campaignId,
            contentData
        );

        return {
            data: convertPrismaSubmission(submission), 
            message: 'Content submitted successfully'
        };
    }
}
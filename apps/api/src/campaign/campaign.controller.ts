import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CampaignService } from './campaign.service.js';
import { Campaign, ApiResponse } from '@repo/shared';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    //Get campaigns for influencer
    @Get(':id')
    async getCampaign(@Param('id') id: string): Promise<ApiResponse<Campaign>> {
        const campaign = await this.campaignService.findOne(id);
        return {
            data: campaign,
            message: 'Campaign retrieved successfully'
        };
    }

    // Get influencers in a campaign
    @Get(':id/influencers')
    async getCampaignInfluencers(@Param('id') id: string): Promise<ApiResponse<any>> {
        const influencers = await this.campaignService.getCampaignInfluencers(id);
        return {
            data: influencers,
            message: 'Campaign influencers retrieved successfully'
        };
    }
}
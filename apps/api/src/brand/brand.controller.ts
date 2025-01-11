import {
    Controller,
    Get,
    UseGuards,
    Param,
    Patch,
    Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { BrandService } from './brand.service';
import { ApiResponse, Role, SubmissionStatus, Submission } from '@repo/shared';

@Controller('brands')
@UseGuards(JwtAuthGuard)
@Roles(Role.BRAND)
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get('campaigns/:campaignId/influencers')
    async getCampaignInfluencers(
        @Param('campaignId') campaignId: string
    ): Promise<ApiResponse<any>> {
        const influencers = await this.brandService.getCampaignInfluencers(campaignId);
        return {
            data: influencers,
            message: 'Campaign influencers retrieved successfully'
        };
    }

    @Patch('submissions/:submissionId/status')
    async updateSubmissionStatus(
        @Param('submissionId') submissionId: string,
        @Body('status') status: SubmissionStatus
    ): Promise<ApiResponse<Submission>> {
        const submission = await this.brandService.updateSubmissionStatus(
            submissionId,
            status
        );
        return {
            data: submission,
            message: `Submission ${status.toLowerCase()} successfully`
        };
    }
}
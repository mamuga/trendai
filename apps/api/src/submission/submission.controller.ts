import { Controller, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { SubmissionService } from './submission.service.js';
import { CreateSubmission, Submission, ApiResponse } from '@repo/shared';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}

    // Submit campaign content
    @Post()
    async create(@Body() createSubmissionDto: CreateSubmission): Promise<ApiResponse<Submission>> {
        const submission = await this.submissionService.create(createSubmissionDto);
        return {
            data: submission,
            message: 'Submission created successfully'
        };
    }

    //Approve/reject submissions
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: 'APPROVED' | 'REJECTED'
    ): Promise<ApiResponse<Submission>> {
        const submission = await this.submissionService.updateStatus(id, status);
        return {
            data: submission,
            message: `Submission ${status.toLowerCase()} successfully`
        };
    }
}

import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller.js';
import { SubmissionService } from './submission.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService],
  imports: [PrismaModule],
  exports: [SubmissionService]
})
export class SubmissionModule {}

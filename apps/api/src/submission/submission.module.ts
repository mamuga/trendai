import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService],
  imports: [PrismaModule],
  exports: [SubmissionService]
})
export class SubmissionModule {}

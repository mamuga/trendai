import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import {PrismaService} from "./prisma/prisma.service.js";
import { UserModule } from './user/user.module.js';
import { CampaignModule } from './campaign/campaign.module.js';
import { SubmissionModule } from './submission/submission.module.js';
import { InfluencerModule } from './influencer/influencer.module.js';
import { BrandModule } from './brand/brand.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [PrismaModule, UserModule, CampaignModule, SubmissionModule, InfluencerModule, BrandModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

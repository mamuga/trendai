import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import {PrismaService} from "./prisma/prisma.service";
import { UserModule } from './user/user.module';
import { CampaignModule } from './campaign/campaign.module';
import { SubmissionModule } from './submission/submission.module';
import { InfluencerModule } from './influencer/influencer.module';
import { BrandModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, CampaignModule, SubmissionModule, InfluencerModule, BrandModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

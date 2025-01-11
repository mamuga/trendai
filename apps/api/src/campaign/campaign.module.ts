import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller.js';
import { CampaignService } from './campaign.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  controllers: [CampaignController],
  providers: [CampaignService],
  imports: [PrismaModule],
  exports: [CampaignService]
})
export class CampaignModule {}

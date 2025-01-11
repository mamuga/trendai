import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [CampaignController],
  providers: [CampaignService],
  imports: [PrismaModule],
  exports: [CampaignService]
})
export class CampaignModule {}

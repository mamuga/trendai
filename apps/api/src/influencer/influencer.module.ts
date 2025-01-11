import { Module } from '@nestjs/common';
import { InfluencerController } from './influencer.controller.js';
import { InfluencerService } from './influencer.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  controllers: [InfluencerController],
  providers: [InfluencerService],
  imports: [PrismaModule],
  exports: [InfluencerService]
})
export class InfluencerModule {}

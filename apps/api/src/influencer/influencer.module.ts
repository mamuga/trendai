import { Module } from '@nestjs/common';
import { InfluencerController } from './influencer.controller';
import { InfluencerService } from './influencer.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [InfluencerController],
  providers: [InfluencerService],
  imports: [PrismaModule],
  exports: [InfluencerService]
})
export class InfluencerModule {}

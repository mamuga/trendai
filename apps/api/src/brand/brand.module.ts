import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [PrismaModule],
  exports: [BrandService]
})
export class BrandModule {}

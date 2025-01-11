import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller.js';
import { BrandService } from './brand.service.js';
import { PrismaModule } from "../prisma/prisma.module.js";

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [PrismaModule],
  exports: [BrandService]
})
export class BrandModule {}

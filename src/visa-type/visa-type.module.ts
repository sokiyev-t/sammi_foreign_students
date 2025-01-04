// visa-type/visa-type.module.ts
import { Module } from '@nestjs/common';
import { VisaTypeService } from './visa-type.service';
import { VisaTypeController } from './visa-type.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VisaTypeController],
  providers: [VisaTypeService, PrismaService],
})
export class VisaTypeModule {}

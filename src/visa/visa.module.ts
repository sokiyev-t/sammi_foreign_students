// visa/visa.module.ts
import { Module } from '@nestjs/common';
import { VisaService } from './visa.service';
import { VisaController } from './visa.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VisaController],
  providers: [VisaService, PrismaService],
})
export class VisaModule {}

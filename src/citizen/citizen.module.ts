// citizen/citizen.module.ts
import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CitizenController],
  providers: [CitizenService, PrismaService],
})
export class CitizenModule {}

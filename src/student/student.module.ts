import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StudentService, PrismaService],
  controllers: [StudentController],
})
export class StudentModule {}

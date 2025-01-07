import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [AuthModule], 
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

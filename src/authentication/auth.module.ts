import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from './strategies/jwt.strategy';
import { JwtVerifyStrategy } from './strategies/jwt-verify.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtAccessStrategy, JwtVerifyStrategy],
  exports: [AuthService],
})
export class AuthModule { }

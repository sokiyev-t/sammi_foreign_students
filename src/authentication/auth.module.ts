import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from './strategies/jwt.strategy';
import { JwtVerifyStrategy } from './strategies/jwt-verify.strategy';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtAccessStrategy, JwtVerifyStrategy],
  exports: [AuthService],
})
export class AuthModule { }

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { AuthEntity } from './entities';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { JwtPayload } from './types';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: AuthDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { username: data.username },
    });

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

    const accessToken = await this.generateToken(
      payload,
      'JWT_ACCESS_SECRET',
      'JWT_ACCESS_EXPIRE',
    );
    const refreshToken = await this.generateToken(
      payload,
      'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRE',
    );

    return {
      accessToken,
      refreshToken,
      userId: user.id,
      username: user.username,
      userRole: user.role,
    };
  }

  async refresh(userId: string, oldRefreshToken: string) {
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      if (!payload || payload.sub !== userId) {
        throw new UnauthorizedException('Refresh token is expired or invalid');
      }
    } catch {
      throw new UnauthorizedException('Refresh token is expired or invalid');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

    const accessToken = await this.generateToken(
      payload,
      'JWT_ACCESS_SECRET',
      'JWT_ACCESS_EXPIRE',
    );
    const refreshToken = await this.generateToken(
      payload,
      'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRE',
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  async register(createDto: RegisterUsersDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...createDto
      }
    });

    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

    const accessToken = await this.generateToken(
      payload,
      'JWT_ACCESS_SECRET',
      'JWT_ACCESS_EXPIRE',
    );
    const refreshToken = await this.generateToken(
      payload,
      'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRE',
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  async addAdmin(createDto: RegisterUsersDto): Promise<any> {

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        role: Role.ADMIN,
        ...createDto
      }
    });

    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };

    const accessToken = await this.generateToken(
      payload,
      'JWT_ACCESS_SECRET',
      'JWT_ACCESS_EXPIRE',
    );
    const refreshToken = await this.generateToken(
      payload,
      'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRE',
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateToken(
    payload: JwtPayload,
    secretKey: string,
    expirationKey: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(secretKey),
      expiresIn: this.configService.get<string>(expirationKey),
    });
  }
}

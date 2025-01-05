import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities';
import { JwtVerifyGuard } from './guards/jwt-verify.guard';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';
import { Role } from '@prisma/client';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthEntity })
  @Post('login')
  async login(@Body() data: AuthDto) {
    return new AuthEntity(await this.authService.login(data));
  }

  @ApiOkResponse({ type: AuthEntity })
  @UseGuards(JwtVerifyGuard)
  @Post('refresh')
  async refresh(@Req() request, @Body() data: RefreshTokenDto) {
    const userId = request.user.sub;
    return new AuthEntity(
      await this.authService.refresh(userId, data.refreshToken),
    );
  }

  @Post('add-admin')
  @Public()
  async addAdmin(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const result = await this.authService.addAdmin(registerDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('register')
  @Roles(Role.ADMIN)
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterUsersDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}

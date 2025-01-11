import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'; //UseGuards
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/guards';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() request) {
    const userId = request.user.sub;
    return await this.userService.findOne(userId);
  }

  @Patch('me/change-password')
  async changePassword(
    @Req() request, 
    @Body() data: ChangePasswordDto
  ) {
    const userId = request.user.sub;
    return await this.userService.changeMyPassword(userId, data);
  }

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(id, data)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}

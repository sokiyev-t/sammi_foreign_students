import { PrismaService } from 'src/prisma.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('A user with this data already exists');
      }
      throw error;
    }
  }

  async getAllUser() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      return await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('User with given unique data already exists');
      }
      if (error.code === 'P2025') {
        throw new BadRequestException('User with given ID does not exist')
      }
      throw error;
    }
  }

  async deleteUser(id: string) {
    const existing = await this.prisma.user.findUnique({ where: { id: id } });
    if (existing && existing.username == 'admin') {
      throw new ConflictException(
        "You can't delete the user with admin username",
      );
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async changeMyPassword(id: string, data: ChangePasswordDto) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    const isPasswordValid = await bcrypt.compare(data.oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('The old password is incorrect.');
    }

    return await this.prisma.user.update({
      where: { id },
      data: { 
        password: await bcrypt.hash(data.newPassword, 10)
      } 
    });
  }
}

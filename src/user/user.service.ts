import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser() {
    return this.prisma.user.findMany();
  }

  async createUser(data: User) {
    const existing = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    return this.prisma.user.create({
      data,
    });
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
}

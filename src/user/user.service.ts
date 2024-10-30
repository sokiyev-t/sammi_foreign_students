import { PrismaService } from "src/prisma.service";
import { User } from "./user.model";
import { ConflictException, Injectable } from "@nestjs/common";


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getAllUser(): Promise<User[]> {
        return this.prisma.user.findMany()
    }


    async createUser(data: User): Promise<User> {
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
}
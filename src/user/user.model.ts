import { Prisma } from "@prisma/client";


export class User implements Prisma.UserCreateInput {
    password: string;
    name: string;
    username: string;
    email: string;
}

import { Prisma } from "@prisma/client";
import { Role } from "src/authentication/role.enum";


export class User implements Prisma.UserCreateInput {
    password: string;
    name: string;
    username: string;
    email: string;
    role: Role;
}

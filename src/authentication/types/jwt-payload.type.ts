import { Role } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  username: string;
  role: Role;
};

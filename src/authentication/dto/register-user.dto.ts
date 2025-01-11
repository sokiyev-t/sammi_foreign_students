import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsString, Length } from 'class-validator';


export class RegisterUsersDto {
  @ApiProperty()
  @IsString()
  @Length(5, 10)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(6, 12)
  password: string;

  @ApiProperty()
  @IsString()
  @Length(5, 10)
  name: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    enum: Role,
    example: Role.ADMIN
  })
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

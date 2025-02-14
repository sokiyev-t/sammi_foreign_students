import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  groupName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  passportSeries?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pinfl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  citizenId?: string; // Updated to string

  @ApiProperty()
  @IsOptional()
  @IsString()
  consultantId?: string; // Updated to string

  @ApiProperty()
  @IsBoolean()
  @IsBoolean()
  isActive?: boolean;
}

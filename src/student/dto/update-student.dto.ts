import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  groupName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportSeries?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pinfl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  citizenId?: string; // Updated to string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  consultantId?: string; // Updated to string

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsBoolean()
  isActive?: boolean;
}

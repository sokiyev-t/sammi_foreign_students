import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsString()
  groupName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  passportSeries: string;

  @ApiProperty()
  @IsString()
  passportNumber: string;

  @ApiProperty()
  @IsDate()
  passportExpired: Date;

  @ApiProperty()
  @IsString()
  pinfl: string;

  @ApiProperty()
  @IsString()
  citizenId: string; // Ensure this is a string

  @ApiProperty()
  @IsString()
  consultantId: string; // Ensure this is a string
}

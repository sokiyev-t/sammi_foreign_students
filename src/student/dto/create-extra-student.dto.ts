import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { CreateRegistrationDto } from 'src/registration/dto/create-registration.dto';
import { CreateVisaDto } from 'src/visa/dto/create-visa.dto';

export class CreateExtraStudentDto {
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

  @ApiProperty()
  visas: CreateVisaDto[];

  @ApiProperty()
  registrations: CreateRegistrationDto[];
}

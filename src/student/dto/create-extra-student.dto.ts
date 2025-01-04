import { IsDate, IsString } from 'class-validator';
import { CreateRegistrationDto } from 'src/registration/dto/create-registration.dto';
import { CreateVisaDto } from 'src/visa/dto/create-visa.dto';

export class CreateExtraStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  passportSeries: string;

  @IsString()
  passportNumber: string;

  @IsDate()
  passportExpired: Date;

  @IsString()
  pinfl: string;

  @IsString()
  citizenId: string; // Ensure this is a string

  @IsString()
  consultantId: string; // Ensure this is a string

  visas: CreateVisaDto[];

  registrations: CreateRegistrationDto[];
}

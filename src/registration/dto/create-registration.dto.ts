// registration/dto/create-registration.dto.ts
import { IsString, IsDate } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  registrationSeries: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  registrationAddress: string;

  @IsDate()
  registrationStart: Date;

  @IsDate()
  registrationEnd: Date;

  @IsString()
  studentsId: string;
}

// registration/dto/create-registration.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateRegistrationDto {
  @ApiProperty()
  @IsString()
  registrationSeries: string;

  @ApiProperty()
  @IsString()
  registrationNumber: string;

  @ApiProperty()
  @IsString()
  registrationAddress: string;

  @ApiProperty()
  @IsDate()
  registrationStart: Date;

  @ApiProperty()
  @IsDate()
  registrationEnd: Date;

  @ApiProperty()
  @IsString()
  studentsId: string;
}

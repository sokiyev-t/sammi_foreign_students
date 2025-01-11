import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';
import { CreateRegistrationConnectDto } from 'src/registration/dto/create-registration.dto';
import { CreateVisaConnectDto } from 'src/visa/dto/create-visa.dto';

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
  citizenId: string;

  @ApiProperty()
  @IsString()
  consultantId: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVisaConnectDto)
  visas: CreateVisaConnectDto[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRegistrationConnectDto)
  registrations: CreateRegistrationConnectDto[];
}

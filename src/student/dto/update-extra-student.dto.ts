import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRegistrationConnectDto } from 'src/registration/dto/create-registration.dto';
import { CreateVisaConnectDto } from 'src/visa/dto/create-visa.dto';

export class UpdateExtraStudentDto {
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

  @ApiProperty()
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
  @IsDate()
  passportExpired?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pinfl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  citizenId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  consultantId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVisaConnectDto)
  visas?: CreateVisaConnectDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRegistrationConnectDto)
  registrations?: CreateRegistrationConnectDto[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsBoolean()
  isActive?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

export class CreateRegistrationConnectDto {
  @IsString()
  @ApiProperty()
  registrationSeries: string;

  @IsString()
  @ApiProperty()
  registrationNumber: string;

  @IsString()
  @ApiProperty()
  registrationAddress: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  registrationStart: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  registrationEnd: Date;
}

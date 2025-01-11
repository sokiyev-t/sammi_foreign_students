// visa/dto/create-visa.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDateString, IsInt, IsDate } from 'class-validator';

export class CreateVisaDto {
  @IsString()
  @ApiProperty()
  visaSeries: string;

  @IsString()
  @ApiProperty()
  visaNumber: string;

  @IsDateString()
  @ApiProperty()
  visaStart: Date;

  @IsDateString()
  @ApiProperty()
  visaEnd: Date;

  @IsString()
  @ApiProperty()
  visaTypeId: string;

  @IsString()
  @ApiProperty()
  studentsId: string;
}

export class CreateVisaConnectDto {
  @IsString()
  @ApiProperty()
  visaSeries: string;

  @ApiProperty()
  @IsString()
  visaNumber: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  visaStart: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  visaEnd: Date;

  @IsString()
  @ApiProperty()
  visaTypeId: string;
}

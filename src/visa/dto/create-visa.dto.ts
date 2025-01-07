// visa/dto/create-visa.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateVisaDto {
  @ApiProperty()
  @IsString()
  visaSeries: string;

  @ApiProperty()
  @IsString()
  visaNumber: string;

  @ApiProperty()
  @IsDateString()
  visaStart: Date;

  @ApiProperty()
  @IsDateString()
  visaEnd: Date;

  @ApiProperty()
  @IsInt()
  visaTypeId: string;

  @ApiProperty()
  @IsInt()
  studentsId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVisaTypeDto {
  @ApiProperty()
  @IsString()
  name: string;
}

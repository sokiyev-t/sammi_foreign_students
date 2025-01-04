// visa-type/dto/create-visa-type.dto.ts
import { IsString } from 'class-validator';

export class CreateVisaTypeDto {
  @IsString()
  name: string;
}

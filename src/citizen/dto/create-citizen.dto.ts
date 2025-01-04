// citizen/dto/create-citizen.dto.ts
import { IsString } from 'class-validator';

export class CreateCitizenDto {
  @IsString()
  name: string;
}

// citizen/dto/create-citizen.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCitizenDto {
  @ApiProperty()
  @IsString()
  name: string;
}

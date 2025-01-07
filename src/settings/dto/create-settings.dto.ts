// settings/dto/create-settings.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CreateSettingsDto {
  @ApiProperty()
  @IsDate()
  visaTime: Date;

  @ApiProperty()
  @IsDate()
  registrationTime: Date;
}

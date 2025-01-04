// settings/dto/create-settings.dto.ts
import { IsDate } from 'class-validator';

export class CreateSettingsDto {
  @IsDate()
  visaTime: Date;

  @IsDate()
  registrationTime: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSettingsDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  visaTime: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  registrationTime: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'proffesor_xvaier' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '123qazwsx' })
  readonly password: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMzIzMTAyNCwiZXhwIjoxNzMzODM1ODI0fQ.DNcX3QHIowkFxfw88Nh6pMXJNSqNPlZBYsf6uSW96dk',
  })
  readonly refreshToken: string;
}

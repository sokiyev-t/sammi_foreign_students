// consultant/dto/create-consultant.dto.ts
import { IsString } from 'class-validator';

export class CreateConsultantDto {
    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;
}

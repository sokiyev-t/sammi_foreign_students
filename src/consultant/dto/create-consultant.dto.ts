// consultant/dto/create-consultant.dto.ts
import { IsString } from 'class-validator';

export class CreateConsultantDto {
    @IsString()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;
}

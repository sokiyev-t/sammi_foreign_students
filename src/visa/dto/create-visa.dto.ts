// visa/dto/create-visa.dto.ts
import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateVisaDto {
    @IsString()
    visaSeries: string;

    @IsString()
    visaNumber: string;

    @IsDateString()
    visaStart: Date;

    @IsDateString()
    visaEnd: Date;

    @IsInt()
    visaTypeId: string;

    @IsInt()
    studentsId: string;
}

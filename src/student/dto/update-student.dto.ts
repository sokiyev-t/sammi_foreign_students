import { IsString, IsOptional } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    passportSeries?: string;

    @IsOptional()
    @IsString()
    passportNumber?: string;

    @IsOptional()
    @IsString()
    pinfl?: string;

    @IsOptional()
    @IsString()
    citizenId?: string; // Updated to string

    @IsOptional()
    @IsString()
    consultantId?: string; // Updated to string
}

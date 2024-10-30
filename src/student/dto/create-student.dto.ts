import { IsDate, IsString } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    middleName: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    passportSeries: string;

    @IsString()
    passportNumber: string;

    @IsDate()
    passportExpired: Date;

    @IsString()
    pinfl: string;

    @IsString()
    citizenId: string; // Ensure this is a string

    @IsString()
    consultantId: string; // Ensure this is a string
}

import { Injectable } from '@nestjs/common';
// import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateExtraStudentDto } from './dto/create-extra-student.dto';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) { }


    // Create a new consultant record
    async createExtraStudents(data: CreateExtraStudentDto[]) {
        try {
            const createdConsultants = [];
            for (const studentData of data) {
                const res = await this.createExtraStudent(studentData);
                createdConsultants.push(res);
            }
            return createdConsultants;
        } catch (error) {
            if (error.code === 'P2002') {
                // P2002 is the Prisma error code for unique constraint violations
                throw new Error('Duplicate record found. Please ensure all values are unique.');
            }
            throw error; // Re-throw other errors if they occur
        }
    }



    async createExtraStudent(data: CreateExtraStudentDto) {
        const { registrations, visas, ...studentData } = data;
        return this.prisma.student.create({
            data: {
                ...studentData,
                registrations: {
                    create: registrations, // Creates related registrations
                },
                visas: {
                    create: visas, // Creates related visas
                },
            },
            include: {
                registrations: true,
                visas: true,
            },

        });
    }

    async createStudent(data: CreateStudentDto) {
        return this.prisma.student.create({
            data,
        });
    }

    async findAll(): Promise<Student[]> {
        return this.prisma.student.findMany(
            {
                include: {
                    visas: true,           // Include all related Visa records
                    registrations: true,    // Include all related Registration records
                    consultant: true,       // Include the related Consultant record
                    citizen: true           // Include the related Citizen record
                }
            }
        );
    }

    async findOne(id: string): Promise<Student | null> {
        return this.prisma.student.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateStudentDto): Promise<Student> {
        return this.prisma.student.update({
            where: { id },
            data,
        });
    }

    // Delete a consultant by ID
    async deleteAll() {
        return this.prisma.student.deleteMany({});
    }

    async remove(id: string): Promise<Student> {
        return this.prisma.student.delete({
            where: { id },
        });
    }
}

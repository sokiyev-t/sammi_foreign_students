import { Injectable } from '@nestjs/common';
// import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService) { }

    async createStudent(data: CreateStudentDto) {
        return this.prisma.student.create({
            data,
        });
    }

    async findAll(): Promise<Student[]> {
        return this.prisma.student.findMany();
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

    async remove(id: string): Promise<Student> {
        return this.prisma.student.delete({
            where: { id },
        });
    }
}

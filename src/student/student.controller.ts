import { Controller, Get, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get()
    findAll(): Promise<Student[]> {
        return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Student | null> {
        return this.studentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
        return this.studentService.update(id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Student> {
        return this.studentService.remove(id);
    }
}

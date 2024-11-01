import { Controller, Get, Body, Patch, Param, Delete, Post, Req, Res, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';
import { CreateExtraStudentDto } from './dto/create-extra-student.dto';
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/role.enum';

@Controller('student')
@UseGuards(JwtAuthGuard)
export class StudentController {
    constructor(private readonly studentService: StudentService) { }


    @Post('/create-many')
    @Roles(Role.ADMIN, Role.EDITOR)
    async createMany(
        @Req() request: Request,
        @Res() response: Response,
        @Body() students: CreateExtraStudentDto[]
    ) {
        try {
            const result = await this.studentService.createExtraStudents(students);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Created!',
                result,
            });
        } catch (err) {
            console.error(err);
            if (err.code === 'P2002') { // Prisma error code for unique constraint violation
                return response.status(400).json({
                    status: 'Error!',
                    message: 'Duplicate record found. Please ensure all values are unique.',
                });
            }
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

    @Post('/create-ex-student')
    @Roles(Role.ADMIN, Role.EDITOR)
    createExStudent(@Body() createStudentDto: CreateExtraStudentDto): Promise<Student> {
        return this.studentService.createExtraStudent(createStudentDto);
    }


    @Post()
    create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findAll(): Promise<Student[]> {
        return this.studentService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findOne(@Param('id') id: string): Promise<Student | null> {
        return this.studentService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
        return this.studentService.update(id, updateStudentDto);
    }

    @Delete('delete-all')
    @Roles(Role.ADMIN, Role.EDITOR)
    removeAll() {
        return this.studentService.deleteAll();
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    remove(@Param('id') id: string): Promise<Student> {
        return this.studentService.remove(id);
    }
}

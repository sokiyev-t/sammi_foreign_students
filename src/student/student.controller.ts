import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  Res,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from '@prisma/client';
import { CreateExtraStudentDto } from './dto/create-extra-student.dto';
import { Response } from 'express';
import { JwtAuthGuard, RolesGuard } from 'src/authentication/guards';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { StudentQueryParamsDto } from './dto/query-params.dto';
import { UpdateExtraStudentDto } from './dto/update-extra-student.dto';

@Controller('student')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/create-many')
  @Roles(Role.ADMIN, Role.EDITOR)
  async createMany(
    @Res() response: Response,
    @Body() students: CreateExtraStudentDto[],
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
      if (err.code === 'P2002') {
        // Prisma error code for unique constraint violation
        return response.status(400).json({
          status: 'Error!',
          message:
            'Duplicate record found. Please ensure all values are unique.',
        });
      }
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/create-ex-student')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async createExStudent(@Body() data: CreateExtraStudentDto): Promise<Student> {
    return await this.studentService.createExtraStudent(data);
  }

  @Post()
  async create(@Body() data: CreateStudentDto): Promise<Student> {
    return await this.studentService.createStudent(data);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  async findAll(@Query() params: StudentQueryParamsDto) {
    return await this.studentService.findAll(params);
  }

  @Get('/find-visa-expired')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  async findVisaExpired() {
    return await this.studentService.findVisaExpired();
  }

  @Get('/find-registration-expired')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  async findRegistrationExpired() {
    return await this.studentService.findRegistrationExpired();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  async findOne(@Param('id') id: string): Promise<Student | null> {
    return await this.studentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentService.update(id, data);
  }

  @Put('/update-ex-student/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async updateExStudent(
    @Param('id') id: string,
    @Body() data: UpdateExtraStudentDto,
  ): Promise<Student> {
    return await this.studentService.updateExtraStudent(id, data);
  }

  @Delete('delete-all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async removeAll() {
    return await this.studentService.deleteAll();
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async remove(@Param('id') id: string): Promise<Student> {
    return await this.studentService.remove(id);
  }
}

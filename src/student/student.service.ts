import { Injectable } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateExtraStudentDto } from './dto/create-extra-student.dto';
import { StudentQueryParamsDto } from './dto/query-params.dto';
import { PaginateFunction, paginator } from 'src/common/pagination/paginator';
import { UpdateExtraStudentDto } from './dto/update-extra-student.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

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
        throw new Error(
          'Duplicate record found. Please ensure all values are unique.',
        );
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

  async findAll(params: StudentQueryParamsDto) {
    const {
      search,
      page,
      perPage,
      visaStart,
      visaEnd,
      registrationStart,
      registrationEnd,
      createdDate,
      byId,
      byCreatedDate,
      byVisaStart,
      byVisaEnd,
      byRegistrationStart,
      byRegistrationEnd
    } = params;

    const where: Prisma.StudentWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { middleName: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(visaStart && visaEnd && {
        visas: {
          some: {
            visaStart: {
              gte: new Date(visaStart),
            },
            visaEnd: {
              lte: new Date(visaEnd)
            }
          }
        }
      }),
      ...(registrationStart && registrationEnd && {
        registrations: {
          some: {
            registrationStart: {
              gte: new Date(registrationStart),
            },
            registrationEnd: {
              lte: new Date(registrationEnd)
            }
          }
        }
      }),
      ...(createdDate && {
        createdAt: {
          gte: new Date(createdDate.setHours(0, 0, 0, 0)),
          lt: new Date(createdDate.setHours(23, 59, 59, 999)),
        },
      }),
    };

    const orderBy: Prisma.StudentOrderByWithRelationInput = {
      ...(byId && { id: byId }),
      ...(byCreatedDate && { createdAt: byCreatedDate }),
      ...(byVisaStart ? [{ visas: { _min: { visaStart: byVisaStart } } }] : []),
      ...(byVisaEnd ? [{ visas: { _max: { visaEnd: byVisaEnd } } }] : []),
      ...(byRegistrationStart ? [{ registrations: { _min: { registrationStart: byRegistrationStart } } }] : []),
      ...(byRegistrationEnd ? [{ registrations: { _max: { registrationEnd: byRegistrationEnd } } }] : [])
    };

    const include: any = {
      visas: {
        include: {
          visaType: true,
        }
      },
      registrations: true,
      consultant: true,
      citizen: true,
    };

    return await paginate(
      this.prisma.student,
      { where, orderBy, include },
      { page, perPage },
    );
  }

  async findOne(id: string): Promise<Student | null> {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  async updateExtraStudent(id: string, data: UpdateExtraStudentDto) {
    const { registrations, visas, ...studentData } = data;
    return this.prisma.student.update({
      where: { id },
      data: {
        ...studentData,
        registrations: {
          deleteMany: {},
          create: registrations,
        },
        visas: {
          deleteMany: {},
          create: visas,
        },
      },
      include: {
        registrations: true,
        visas: true,
      },
    });
  }

  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    return await this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async deleteAll() {
    return await this.prisma.student.deleteMany({});
  }

  async remove(id: string): Promise<Student> {
    return await this.prisma.student.delete({
      where: { id },
    });
  }
}

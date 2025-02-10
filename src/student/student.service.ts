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
      page = 1,
      perPage = 10,
      visaStart,
      visaEnd,
      registrationStart,
      registrationEnd,
      createdDate,
      byId,
      byCreatedDate,
      byVisaEnd,
      byRegistrationEnd,
    } = params;

    const offset = (page - 1) * perPage;

    // ✅ Convert Date objects to PostgreSQL-friendly format
    const formatDate = (date: Date | undefined): string | null => {
      return date ? `'${date.toISOString().replace('T', ' ').split('.')[0]}'` : null;
    };

    const visaStartFilter = formatDate(visaStart);
    const visaEndFilter = formatDate(visaEnd);
    const registrationStartFilter = formatDate(registrationStart);
    const registrationEndFilter = formatDate(registrationEnd);
    const createdDateFilter = formatDate(createdDate);

    // Default ordering
    let orderByClause = 's."createdAt" DESC';
    if (byId) orderByClause = `s.id ${byId}`;
    if (byCreatedDate) orderByClause = `s."createdAt" ${byCreatedDate}`;
    if (byVisaEnd) orderByClause = `v.latest_visa_end ${byVisaEnd} NULLS LAST`;
    if (byRegistrationEnd) orderByClause = `r.latest_registration_end ${byRegistrationEnd} NULLS LAST`;

    // ✅ Build raw SQL query
    const query = `
      SELECT 
        s.*, 
        v.latest_visa_end,
        r.latest_registration_end,
        jsonb_agg(DISTINCT jsonb_build_object(
          'id', vs.id,
          'visaSeries', vs."visaSeries",
          'visaNumber', vs."visaNumber",
          'visaStart', vs."visaStart",
          'visaEnd', vs."visaEnd",
          'visaType', jsonb_build_object(
            'id', vt.id,
            'name', vt.name
          )
        )) AS visas,
        jsonb_agg(DISTINCT jsonb_build_object(
          'id', rg.id,
          'registrationSeries', rg."registrationSeries",
          'registrationNumber', rg."registrationNumber",
          'registrationAddress', rg."registrationAddress",
          'registrationStart', rg."registrationStart",
          'registrationEnd', rg."registrationEnd"
        )) AS registrations,
        jsonb_build_object(
          'id', c.id,
          'name', c.name,
          'phoneNumber', c."phoneNumber"
        ) AS consultant,
        jsonb_build_object(
          'id', cz.id,
          'name', cz.name
        ) AS citizen
      FROM "Student" s
      LEFT JOIN (
        SELECT "studentsId", MAX("visaEnd") AS latest_visa_end
        FROM "Visa"
        GROUP BY "studentsId"
      ) v ON s.id = v."studentsId"
      LEFT JOIN (
        SELECT "studentsId", MAX("registrationEnd") AS latest_registration_end
        FROM "Registration"
        GROUP BY "studentsId"
      ) r ON s.id = r."studentsId"
      LEFT JOIN "Visa" vs ON vs."studentsId" = s.id
      LEFT JOIN "VisaType" vt ON vt.id = vs."visaTypeId"
      LEFT JOIN "Registration" rg ON rg."studentsId" = s.id
      LEFT JOIN "Consultant" c ON c.id = s."consultantId"
      LEFT JOIN "Citizen" cz ON cz.id = s."citizenId"
      WHERE 
        (${search ? `
          "s"."firstName" ILIKE '%${search}%' OR
          "s"."lastName" ILIKE '%${search}%' OR
          "s"."middleName" ILIKE '%${search}%' OR
          "s"."phoneNumber" ILIKE '%${search}%'
        ` : 'TRUE'})
        AND (${visaStartFilter && visaEndFilter ? `
          "vs"."visaStart" >= ${visaStartFilter} AND 
          "vs"."visaEnd" <= ${visaEndFilter}
        ` : 'TRUE'})
        AND (${registrationStartFilter && registrationEndFilter ? `
          "rg"."registrationStart" >= ${registrationStartFilter} AND 
          "rg"."registrationEnd" <= ${registrationEndFilter}
        ` : 'TRUE'})
        AND (${createdDateFilter ? `
          "s"."createdAt" >= ${createdDateFilter} AND 
          "s"."createdAt" <= ${createdDateFilter.replace('00:00:00', '23:59:59')}
        ` : 'TRUE'})
      GROUP BY s.id, v.latest_visa_end, r.latest_registration_end, c.id, cz.id
      ORDER BY ${orderByClause}
      LIMIT ${perPage} OFFSET ${offset};
    `;

    // ✅ Run the raw SQL query
    const students = await this.prisma.$queryRawUnsafe<any[]>(query);

    // ✅ Get total count of students
    const totalStudents = await this.prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint AS count FROM "Student";
    `;

    // ✅ Convert BigInt → Number
    const total = Number(totalStudents[0]?.count || 0);
    const lastPage = Math.ceil(total / perPage);

    return {
      data: students,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
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

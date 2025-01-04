// consultant/consultant.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Injectable()
export class ConsultantService {
  constructor(private prisma: PrismaService) {}

  // Create a new consultant record
  async createConsultants(data: CreateConsultantDto[]) {
    try {
      return await this.prisma.consultant.createMany({
        data,
        skipDuplicates: true, // Skip records that have duplicate unique fields
      });
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
  // Create a new consultant record
  async createConsultant(data: CreateConsultantDto) {
    this.prisma.consultant
      .create({
        data,
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw e;
      });
  }

  // Get all consultants
  async findAll() {
    return this.prisma.consultant.findMany({
      include: {},
    });
  }

  // Get a consultant by ID
  async findOne(id: string) {
    return this.prisma.consultant.findUnique({
      where: { id },
      include: {},
    });
  }

  // Update a consultant record by ID
  async updateConsultant(id: string, data: UpdateConsultantDto) {
    return this.prisma.consultant.update({
      where: { id },
      data,
    });
  }

  // Delete a consultant by ID
  async deleteAll() {
    return this.prisma.consultant.deleteMany({});
  }
  // Delete a consultant by ID
  async deleteConsultant(id: string) {
    return this.prisma.consultant.delete({
      where: { id },
    });
  }
}

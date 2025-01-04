// citizen/citizen.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';

@Injectable()
export class CitizenService {
  constructor(private prisma: PrismaService) {}

  async createCitizens(data: CreateCitizenDto[]) {
    try {
      return await this.prisma.citizen.createMany({
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

  // Create a new citizen
  async createCitizen(data: CreateCitizenDto) {
    return this.prisma.citizen.create({
      data: data,
    });
  }

  // Get all citizens
  async findAll() {
    return this.prisma.citizen.findMany();
  }

  // Get a citizen by ID
  async findOne(id: string) {
    return this.prisma.citizen.findUnique({
      where: { id },
    });
  }

  // Update a citizen by ID
  async updateCitizen(id: string, data: UpdateCitizenDto) {
    return this.prisma.citizen.update({
      where: { id },
      data: data,
    });
  }

  // Delete a consultant by ID
  async deleteAll() {
    return this.prisma.consultant.deleteMany({});
  }

  // Delete a citizen by ID
  async deleteCitizen(id: string) {
    return this.prisma.citizen.delete({
      where: { id },
    });
  }
}

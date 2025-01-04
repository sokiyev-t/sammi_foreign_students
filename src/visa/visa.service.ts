// visa/visa.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';

@Injectable()
export class VisaService {
  constructor(private prisma: PrismaService) {}

  // Create a new visa
  async createVisa(data: CreateVisaDto) {
    return this.prisma.visa.create({
      data,
    });
  }

  // Get all visas
  async findAll() {
    return this.prisma.visa.findMany({
      include: {
        visaType: true,
        student: true,
      },
    });
  }

  // Get a visa by ID
  async findOne(id: string) {
    return this.prisma.visa.findUnique({
      where: { id },
      include: {
        visaType: true,
        student: true,
      },
    });
  }

  // Update a visa by ID
  async updateVisa(id: string, data: UpdateVisaDto) {
    return this.prisma.visa.update({
      where: { id },
      data,
    });
  }

  // Delete a visa by ID
  async deleteVisa(id: string) {
    return this.prisma.visa.delete({
      where: { id },
    });
  }
}

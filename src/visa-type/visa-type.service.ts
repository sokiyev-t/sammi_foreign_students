// visa-type/visa-type.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateVisaTypeDto } from './dto/create-visa-type.dto';
import { UpdateVisaTypeDto } from './dto/update-visa-type.dto';

@Injectable()
export class VisaTypeService {
  constructor(private prisma: PrismaService) {}

  // Create a new visa type
  async createVisaType(data: CreateVisaTypeDto) {
    return this.prisma.visaType.create({
      data: data,
    });
  }

  // Get all visa types
  async findAll() {
    return this.prisma.visaType.findMany();
  }

  // Get a visa type by ID
  async findOne(id: string) {
    return this.prisma.visaType.findUnique({
      where: { id },
    });
  }

  // Update a visa type by ID
  async updateVisaType(id: string, data: UpdateVisaTypeDto) {
    return this.prisma.visaType.update({
      where: { id },
      data: data,
    });
  }

  // Delete a visa type by ID
  async deleteVisaType(id: string) {
    return this.prisma.visaType.delete({
      where: { id },
    });
  }
  // Delete a visa type by ID
  async deleteAll() {
    return this.prisma.visaType.deleteMany({});
  }
}

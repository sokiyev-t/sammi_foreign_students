// registration/registration.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  // Create a new registration record
  async createRegistration(data: CreateRegistrationDto) {
    return this.prisma.registration.create({
      data,
    });
  }

  // Get all registrations
  async findAll() {
    return this.prisma.registration.findMany({
      include: { student: true },
    });
  }

  // Get a registration by ID
  async findOne(id: string) {
    return this.prisma.registration.findUnique({
      where: { id },
      include: { student: true },
    });
  }

  // Update a registration record by ID
  async updateRegistration(id: string, data: UpdateRegistrationDto) {
    return this.prisma.registration.update({
      where: { id },
      data,
    });
  }

  // Delete a registration by ID
  async deleteRegistration(id: string) {
    return this.prisma.registration.delete({
      where: { id },
    });
  }
}

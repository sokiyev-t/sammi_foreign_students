// consultant/consultant.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Injectable()
export class ConsultantService {
    constructor(private prisma: PrismaService) { }

    // Create a new consultant record
    async createConsultant(data: CreateConsultantDto) {
        return this.prisma.consultant.create({
            data,
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
    async deleteConsultant(id: string) {
        return this.prisma.consultant.delete({
            where: { id },
        });
    }
}

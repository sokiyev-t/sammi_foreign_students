// citizen/citizen.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';

@Injectable()
export class CitizenService {
    constructor(private prisma: PrismaService) { }

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

    // Delete a citizen by ID
    async deleteCitizen(id: string) {
        return this.prisma.citizen.delete({
            where: { id },
        });
    }
}

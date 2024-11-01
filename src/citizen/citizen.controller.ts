// citizen/citizen.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/role.enum';

@Controller('citizen')
@UseGuards(JwtAuthGuard)
export class CitizenController {
    constructor(private readonly citizenService: CitizenService) { }


    @Post('/create-many')
    @Roles(Role.ADMIN, Role.EDITOR)
    async createMany(
        @Req() request: Request,
        @Res() response: Response,
        @Body() data: CreateCitizenDto[]
    ) {
        try {
            const result = await this.citizenService.createCitizens(data);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Created!',
                result,
            });
        } catch (err) {
            console.error(err);
            if (err.code === 'P2002') { // Prisma error code for unique constraint violation
                return response.status(400).json({
                    status: 'Error!',
                    message: 'Duplicate record found. Please ensure all values are unique.',
                });
            }
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

    @Post()
    @Roles(Role.ADMIN, Role.EDITOR)
    create(@Body() createCitizenDto: CreateCitizenDto) {
        return this.citizenService.createCitizen(createCitizenDto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findAll() {
        return this.citizenService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findOne(@Param('id') id: string) {
        return this.citizenService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    update(@Param('id') id: string, @Body() updateCitizenDto: UpdateCitizenDto) {
        return this.citizenService.updateCitizen(id, updateCitizenDto);
    }


    @Delete('delete-all')
    @Roles(Role.ADMIN, Role.EDITOR)
    removeAll() {
        return this.citizenService.deleteAll();
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    remove(@Param('id') id: string) {
        return this.citizenService.deleteCitizen(id);
    }
}

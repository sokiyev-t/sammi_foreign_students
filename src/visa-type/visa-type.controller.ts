// visa-type/visa-type.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VisaTypeService } from './visa-type.service';
import { CreateVisaTypeDto } from './dto/create-visa-type.dto';
import { UpdateVisaTypeDto } from './dto/update-visa-type.dto';

import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/role.enum';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Public } from 'src/authentication/public.decorator';

@Controller('visa-type')
@UseGuards(JwtAuthGuard) // Apply RolesGuard at the controller level
export class VisaTypeController {
    constructor(private readonly visaTypeService: VisaTypeService) { }

    @Post()
    @Roles(Role.ADMIN, Role.EDITOR) // Accessible by admins and editors
    create(@Body() createVisaTypeDto: CreateVisaTypeDto) {
        return this.visaTypeService.createVisaType(createVisaTypeDto);
    }

    @Get()
    @Public() // Public route
    findAll() {
        return this.visaTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.visaTypeService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.EDITOR) // Accessible by admins and editors
    update(@Param('id') id: string, @Body() updateVisaTypeDto: UpdateVisaTypeDto) {
        return this.visaTypeService.updateVisaType(id, updateVisaTypeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.visaTypeService.deleteVisaType(id);
    }
}

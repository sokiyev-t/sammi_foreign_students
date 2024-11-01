// visa-type/visa-type.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VisaTypeService } from './visa-type.service';
import { CreateVisaTypeDto } from './dto/create-visa-type.dto';
import { UpdateVisaTypeDto } from './dto/update-visa-type.dto';

import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/role.enum';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('visa-type')
@UseGuards(JwtAuthGuard)
export class VisaTypeController {
    constructor(private readonly visaTypeService: VisaTypeService) { }

    @Post()
    @Roles(Role.ADMIN, Role.EDITOR)
    create(@Body() createVisaTypeDto: CreateVisaTypeDto) {
        return this.visaTypeService.createVisaType(createVisaTypeDto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findAll() {
        return this.visaTypeService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findOne(@Param('id') id: string) {
        return this.visaTypeService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    update(@Param('id') id: string, @Body() updateVisaTypeDto: UpdateVisaTypeDto) {
        return this.visaTypeService.updateVisaType(id, updateVisaTypeDto);
    }

    @Delete("/delete-all")
    @Roles(Role.ADMIN, Role.EDITOR)
    removeAll() {
        return this.visaTypeService.deleteAll();
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    remove(@Param('id') id: string) {
        return this.visaTypeService.deleteVisaType(id);
    }

}

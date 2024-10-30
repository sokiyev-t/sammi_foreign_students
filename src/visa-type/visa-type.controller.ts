// visa-type/visa-type.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisaTypeService } from './visa-type.service';
import { CreateVisaTypeDto } from './dto/create-visa-type.dto';
import { UpdateVisaTypeDto } from './dto/update-visa-type.dto';

@Controller('visa-type')
export class VisaTypeController {
    constructor(private readonly visaTypeService: VisaTypeService) { }

    @Post()
    create(@Body() createVisaTypeDto: CreateVisaTypeDto) {
        return this.visaTypeService.createVisaType(createVisaTypeDto);
    }

    @Get()
    findAll() {
        return this.visaTypeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.visaTypeService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVisaTypeDto: UpdateVisaTypeDto) {
        return this.visaTypeService.updateVisaType(id, updateVisaTypeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.visaTypeService.deleteVisaType(id);
    }
}

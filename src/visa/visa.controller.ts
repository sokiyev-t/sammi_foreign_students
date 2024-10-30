// visa/visa.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisaService } from './visa.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';

@Controller('visa')
export class VisaController {
    constructor(private readonly visaService: VisaService) { }

    @Post()
    create(@Body() createVisaDto: CreateVisaDto) {
        return this.visaService.createVisa(createVisaDto);
    }

    @Get()
    findAll() {
        return this.visaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.visaService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVisaDto: UpdateVisaDto) {
        return this.visaService.updateVisa(id, updateVisaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.visaService.deleteVisa(id);
    }
}

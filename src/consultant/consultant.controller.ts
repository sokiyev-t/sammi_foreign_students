// consultant/consultant.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Controller('consultant')
export class ConsultantController {
    constructor(private readonly consultantService: ConsultantService) { }

    @Post()
    create(@Body() createConsultantDto: CreateConsultantDto) {
        return this.consultantService.createConsultant(createConsultantDto);
    }

    @Get()
    findAll() {
        return this.consultantService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.consultantService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
        return this.consultantService.updateConsultant(id, updateConsultantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.consultantService.deleteConsultant(id);
    }
}

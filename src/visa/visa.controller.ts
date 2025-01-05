// visa/visa.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VisaService } from './visa.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';
import { JwtAuthGuard } from 'src/authentication/guards';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('visa')
@UseGuards(JwtAuthGuard)
export class VisaController {
  constructor(private readonly visaService: VisaService) {}

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() createVisaDto: CreateVisaDto) {
    return this.visaService.createVisa(createVisaDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  findAll() {
    return this.visaService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  findOne(@Param('id') id: string) {
    return this.visaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param('id') id: string, @Body() updateVisaDto: UpdateVisaDto) {
    return this.visaService.updateVisa(id, updateVisaDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.visaService.deleteVisa(id);
  }
}

// consultant/consultant.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/guards';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from '@prisma/client';@Controller('consultant')

@UseGuards(JwtAuthGuard)
@Controller('consultant')
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}

  @Post('/create-many')
  @Roles(Role.ADMIN, Role.EDITOR)
  async createMany(
    @Req() request: Request,
    @Res() response: Response,
    @Body() consultants: CreateConsultantDto[],
  ) {
    try {
      const result =
        await this.consultantService.createConsultants(consultants);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Created!',
        result,
      });
    } catch (err) {
      console.error(err);
      if (err.code === 'P2002') {
        // Prisma error code for unique constraint violation
        return response.status(400).json({
          status: 'Error!',
          message:
            'Duplicate record found. Please ensure all values are unique.',
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
  create(@Body() createConsultantDto: CreateConsultantDto) {
    return this.consultantService.createConsultant(createConsultantDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  findAll() {
    return this.consultantService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  findOne(@Param('id') id: string) {
    return this.consultantService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  update(
    @Param('id') id: string,
    @Body() updateConsultantDto: UpdateConsultantDto,
  ) {
    return this.consultantService.updateConsultant(id, updateConsultantDto);
  }

  @Delete('delete-all')
  @Roles(Role.ADMIN, Role.EDITOR)
  removeAll() {
    return this.consultantService.deleteAll();
  }
  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.consultantService.deleteConsultant(id);
  }
}

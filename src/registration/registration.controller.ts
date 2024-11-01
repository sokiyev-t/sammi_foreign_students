// registration/registration.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { Role } from 'src/authentication/role.enum';
import { Roles } from 'src/authentication/roles.decorator';

@Controller('registration')
@UseGuards(JwtAuthGuard)
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    @Post()
    @Roles(Role.ADMIN, Role.EDITOR)
    create(@Body() createRegistrationDto: CreateRegistrationDto) {
        return this.registrationService.createRegistration(createRegistrationDto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findAll() {
        return this.registrationService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    findOne(@Param('id') id: string) {
        return this.registrationService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
        return this.registrationService.updateRegistration(id, updateRegistrationDto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.EDITOR)
    remove(@Param('id') id: string) {
        return this.registrationService.deleteRegistration(id);
    }
}

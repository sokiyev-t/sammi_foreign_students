// settings/settings.controller.ts
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  @Post()
  create(@Body() createSettingsDto: CreateSettingsDto) {
    return this.settingsService.createSettings(createSettingsDto);
  }

  @Get()
  findOne() {
    return this.settingsService.findOne();
  }

  @Patch()
  update(@Body() updateSettingsDto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(updateSettingsDto);
  }
}

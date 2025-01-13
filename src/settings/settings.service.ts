// settings/settings.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  // Create new settings
  async createSettings(data: CreateSettingsDto) {
    return this.prisma.settings.create({
      data,
    });
  }

  // Get settings
  async findOne() {
    return await this.prisma.settings.findFirst();
  }

  // Update settings
  async updateSettings(data: UpdateSettingsDto) {
    const setData = await this.prisma.settings.findFirst();
    return this.prisma.settings.update({
      where: { id: setData.id }, // Update the single settings record
      data,
    });
  }
}

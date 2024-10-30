// visa/dto/update-visa.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaDto } from './create-visa.dto';

export class UpdateVisaDto extends PartialType(CreateVisaDto) { }

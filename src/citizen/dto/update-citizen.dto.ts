// citizen/dto/update-citizen.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCitizenDto } from './create-citizen.dto';

export class UpdateCitizenDto extends PartialType(CreateCitizenDto) { }

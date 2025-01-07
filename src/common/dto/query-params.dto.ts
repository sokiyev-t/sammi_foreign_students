import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BooleanFilter {
  TRUE = 'true',
  FALSE = 'false',
}

export class BaseQueryParamsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  readonly search?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly page?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly perPage?: number;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({ enum: SortOrder, required: false })
  readonly byId?: SortOrder;
}

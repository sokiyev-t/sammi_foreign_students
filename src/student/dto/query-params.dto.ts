import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional } from "class-validator";
import { BaseQueryParamsDto, SortOrder } from "src/common/dto/query-params.dto";

export class StudentQueryParamsDto extends BaseQueryParamsDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Filter by visa start date in ISO format',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  visaStart?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Filter by visa end date in ISO format',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  visaEnd?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Filter by visa start date in ISO format',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  registrationStart?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Filter by visa end date in ISO format',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  registrationEnd?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Filter by user creation date in ISO format',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  readonly createdDate?: Date;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sort by creation date (ASC or DESC)',
    enum: SortOrder,
    required: false,
  })
  readonly byCreatedDate?: SortOrder;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sort by Visa start date (ASC or DESC)',
    enum: SortOrder,
    required: false
  })
  readonly byVisaStart?: SortOrder;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sort by Visa start date (ASC or DESC)',
    enum: SortOrder,
    required: false
  })
  readonly byVisaEnd?: SortOrder;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sort by Visa start date (ASC or DESC)',
    enum: SortOrder,
    required: false
  })
  readonly byRegistrationStart?: SortOrder;

  @IsEnum(SortOrder)
  @IsOptional()
  @ApiProperty({
    description: 'Sort by Visa start date (ASC or DESC)',
    enum: SortOrder,
    required: false
  })
  readonly byRegistrationEnd?: SortOrder;
}

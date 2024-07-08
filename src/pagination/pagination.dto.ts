import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

class PaginationDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 5,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  limit: number;
}

export { PaginationDto };

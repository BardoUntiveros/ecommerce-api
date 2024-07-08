import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export { UpdateCategoryDto };

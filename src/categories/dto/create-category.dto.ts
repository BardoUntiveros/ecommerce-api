import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export { CreateCategoryDto };

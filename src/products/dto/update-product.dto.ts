import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

class UpdateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 13 Pro',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'The best smartphone on the market',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product price',
    example: '100.00',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({
    description: 'Product stock',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({
    description: 'Product category ID',
    example: '35aca1e6-e3d7-4889-82b4-ca572385b7a4',
  })
  @IsNotEmpty()
  @IsUUID('4')
  categoryId: string;
}

export { UpdateProductDto };

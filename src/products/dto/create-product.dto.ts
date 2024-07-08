import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Product name',
    example: 'iPhone 15 Pro',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Product description',
    example: 'The iPhone 15 Pro is the latest model of iPhones',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: 'Product price',
    example: '100.00',
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly price: number;

  @ApiProperty({
    type: Number,
    description: 'Product stock',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({
    type: String,
    description: 'Product image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({
    type: String,
    description: 'Product category id',
    example: '5f8d9f5a-d7f9-4b7b-b8f6-f1e2e7a3b4c5',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly categoryId: string;
}

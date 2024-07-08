import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { GetProductDto } from '../../products/dto/get-product.dto';

class CreateOrderDto {
  @ApiProperty({
    description: 'User id',
    example: '335a96d5-20e9-4c9b-ab88-555dd25b8904',
  })
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  @ApiProperty({
    description: 'Product ids',
    example:
      '[{"id":"4991c569-30d1-4a13-9089-c61fd25025d3"}, {"id":"35aca1e6-e3d7-4889-82b4-ca572385b7a4"}]',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GetProductDto)
  productIds: GetProductDto[];
}

export { CreateOrderDto };

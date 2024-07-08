import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class GetProductDto {
  @ApiProperty({
    type: String,
    description: 'Product id',
    example: '5f8d9f5a-d7f9-4b7b-b8f6-f1e2e7a3b4c5',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly id: string;
}

export { GetProductDto };

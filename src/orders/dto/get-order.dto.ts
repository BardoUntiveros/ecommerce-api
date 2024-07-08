import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class GetOrderDto {
  @ApiProperty({
    description: 'Order id',
    example: '335a96d5-20e9-4c9b-ab88-555dd25b8904',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly id: string;
}

export { GetOrderDto };

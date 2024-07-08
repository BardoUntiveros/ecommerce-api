import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

class GetUserDto {
  @ApiProperty({
    description: 'User id',
    example: '7305da77-92f2-479c-9dc6-f16d82c0ca10',
  })
  @IsNotEmpty()
  @IsUUID('4')
  readonly id: string;
}

export { GetUserDto };

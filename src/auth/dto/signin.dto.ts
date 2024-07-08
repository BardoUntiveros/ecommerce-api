import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class SignInDto {
  @ApiProperty({
    description: 'Correo electronico',
    example: 'test@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    example: 'Test123!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export { SignInDto };

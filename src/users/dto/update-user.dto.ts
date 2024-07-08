import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  readonly name: string;

  @ApiProperty({
    description: 'Password',
    example: 'Test123!',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @MaxLength(15)
  readonly password: string;

  @ApiProperty({
    description: 'Address',
    example: '113 Street',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  readonly address: string;

  @ApiProperty({
    description: 'Phone',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly phone: number;

  @ApiProperty({
    description: 'Country',
    example: 'Spain',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly country: string;

  @ApiProperty({
    description: 'City',
    example: 'Madrid',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly city: string;
}

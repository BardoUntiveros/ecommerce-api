import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { User } from '../users/users.entity';
import { SignupDto } from './dto/signup.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in a user getting authorization token' })
  @ApiBody({ type: SignInDto, description: 'Sign in payload' })
  @ApiResponse({
    status: 200,
    description: 'Ok -Returns access token',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Email or password incorrect',
  })
  async signin(@Body() signinDto: SignInDto): Promise<string> {
    return await this.authService.signin(signinDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: SignupDto, description: 'Sign up payload' })
  @ApiResponse({
    status: 201,
    description: 'Created -Returns user without password',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Passwords do not match',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already in use',
  })
  createUser(
    @Body() signupDto: SignupDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    return this.authService.signup(signupDto);
  }
}

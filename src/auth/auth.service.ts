import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repository/users.repository';
import { SignInDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from '../users/users.entity';
import { IUserPayload } from './auth.types';
import { Role } from '../roles/roles.entity';
import { RoleName } from '../roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SignInDto): Promise<string> {
    const { email, password } = signinDto;

    // Check if user exists
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'Correo electrónico o contraseña incorrectos',
      );
    }

    // Check if password is correct
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'Correo electrónico o contraseña incorrectos',
      );
    }

    // Retrieving user roles
    const roles = user.roles.map((role) => role.name);

    // Generate a token with user data
    const payload: IUserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    const { email, password1, password2 } = signupDto;

    // Check if passwords are the same
    if (password1 !== password2) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password1, 10);

    // Check if user exists
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new ConflictException(
        `Ya existe un usuario con el correo electrónico ${email}`,
      );
    }

    // Create user
    delete signupDto.password1;
    delete signupDto.password2;
    signupDto['password'] = hashedPassword;
    const newUser = this.usersRepository.create(signupDto);

    // Setting default role
    const rolesRepository = this.usersRepository.manager.getRepository(Role);
    const userRole = await rolesRepository.findOneBy({
      name: RoleName.USER,
    });
    newUser.roles = [userRole];

    // Saving user
    await this.usersRepository.save(newUser);

    // Returning user without password and roles
    const { password, roles, ...newUserWithoutPassword } = newUser;
    return newUserWithoutPassword;
  }
}

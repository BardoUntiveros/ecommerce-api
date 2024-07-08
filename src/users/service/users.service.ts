import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUserDto } from '../dto/get-user.dto';

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();

    // Returning user without password
    return users.map((user) => {
      const { password, ...publicUser } = user;
      return publicUser;
    });
  }

  async getUser(
    getUserDto: GetUserDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    const { id } = getUserDto;

    // Check if user exists
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);
    }

    // Returning user without password and roles
    const { password, roles, ...publicUser } = user;
    return publicUser;
  }

  async updateUser(
    getUserDto: GetUserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    const { id } = getUserDto;

    // Check if user exists
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no fue encontrado`);
    }

    // Updating user
    await this.usersRepository.update(id, updateUserDto);

    // Returning user without password and roles
    const { password, roles, ...publicUser } = user;
    return publicUser;
  }

  async deleteUser(getUserDto: GetUserDto): Promise<void> {
    const { id } = getUserDto;

    // Check if user exists
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no fue encontrado`);
    }

    await this.usersRepository.delete(id);
  }
}

export { UsersService };

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repository/users.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('should be defined', () => {
      expect(usersService.getUsers).toBeDefined();
    });

    it('should return an array of users with roles andwithout password', async () => {
      const mockUsers = [
        { id: 'test-id-1', password: 'test-password', roles: [] },
        { id: 'test-id-2', password: 'test-password', roles: [] },
      ];

      jest.spyOn(mockUsersRepository, 'find').mockResolvedValue(mockUsers);

      const result = await usersService.getUsers();

      for (const user of result) {
        expect(user).toHaveProperty('roles');
        expect(user).not.toHaveProperty('password');
      }
    });

    it('should return empty array when no users found', async () => {
      jest.spyOn(mockUsersRepository, 'find').mockResolvedValue([]);

      const result = await usersService.getUsers();

      expect(result).toEqual([]);
    });
  });

  describe('getUser', () => {
    it('should be defined', () => {
      expect(usersService.getUser).toBeDefined();
    });

    it('should return a user without roles and roles', async () => {
      const mockUser = {
        id: 'test-id-1',
        password: 'test-password',
        roles: [],
      };

      jest.spyOn(mockUsersRepository, 'findById').mockResolvedValue(mockUser);

      const result = await usersService.getUser({ id: mockUser.id });

      expect(result).not.toHaveProperty('roles');
      expect(result).not.toHaveProperty('password');
    });

    it('should throw not found exception when user not found', async () => {
      const id = 'test-id-1';

      jest.spyOn(mockUsersRepository, 'findById').mockResolvedValue(null);

      await expect(usersService.getUser({ id })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(usersService.updateUser).toBeDefined();
    });

    it('should return user without password and roles', async () => {
      const mockUser = {
        id: 'test-id-1',
        password: 'test-password',
        roles: [],
      };
      const mockUpdateUserDto = { email: 'test@mail.com' };

      jest.spyOn(mockUsersRepository, 'findById').mockResolvedValue(mockUser);

      const result = await usersService.updateUser(
        { id: mockUser.id },
        mockUpdateUserDto as UpdateUserDto,
      );

      expect(result).not.toHaveProperty('roles');
      expect(result).not.toHaveProperty('password');
    });

    it('should throw not found exception when user not found', async () => {
      const id = 'test-id-1';
      const mockUpdateUserDto = { email: 'test@mail.com' };

      jest.spyOn(mockUsersRepository, 'findById').mockResolvedValue(null);

      await expect(
        usersService.updateUser({ id }, mockUpdateUserDto as UpdateUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should be defined', () => {
      expect(usersService.deleteUser).toBeDefined();
    });

    it('should return void', async () => {
      const mockUser = {
        id: 'test-id-1',
      };

      jest.spyOn(mockUsersRepository, 'findById').mockResolvedValue(mockUser);

      const result = await usersService.deleteUser({ id: mockUser.id });

      expect(result).toBeUndefined();
    });
  });
});

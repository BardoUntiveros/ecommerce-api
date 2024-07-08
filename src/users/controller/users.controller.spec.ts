import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { PaginationService } from '../../pagination/service/pagination.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { User } from '../users.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  describe('getUsers', () => {
    it('should be defined', () => {
      expect(usersController.getUsers).toBeDefined();
    });

    it('should return paginated users without password', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };
      const mockUsers = [{ id: 'test-id-1' }, { id: 'test-id-2' }];
      const paginatedResult = {
        page: 1,
        totalCount: 2,
        data: mockUsers,
      };

      jest
        .spyOn(usersService, 'getUsers')
        .mockResolvedValue(mockUsers as Omit<User, 'password'>[]);

      jest
        .spyOn(paginationService, 'paginate')
        .mockReturnValue(paginatedResult);

      const result = await usersController.getUsers(paginationDto);

      expect(result).toEqual(paginatedResult);
    });
  });
});

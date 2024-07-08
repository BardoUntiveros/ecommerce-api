import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { User } from '../users.entity';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let dataSource: Partial<DataSource>;

  beforeEach(async () => {
    // Mock the data source
    dataSource = {
      createEntityManager: jest.fn(),
    };

    // Mock the module
    const module = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    // Mock the users repository
    usersRepository = module.get(UsersRepository);
  });

  describe('findById', () => {
    it('should be defined', () => {
      expect(usersRepository.findById).toBeDefined();
    });

    it('should return found user by id', async () => {
      const id = 'id';
      const mockUser = { id };

      const findOneSpy = jest
        .spyOn(usersRepository, 'findOneBy')
        .mockResolvedValue(mockUser as User);

      const foundUser = await usersRepository.findById(id);

      expect(foundUser).toEqual(mockUser);
      expect(findOneSpy).toHaveBeenCalledWith({ id });
    });
  });

  describe('findByEmail', () => {
    it('should be defined', () => {
      expect(usersRepository.findByEmail).toBeDefined();
    });

    it('should return found user by email', async () => {
      const email = 'email';
      const mockUser = { email };

      const findOneSpy = jest
        .spyOn(usersRepository, 'findOneBy')
        .mockResolvedValue(mockUser as User);

      const foundUser = await usersRepository.findByEmail(email);

      expect(foundUser).toEqual(mockUser);
      expect(findOneSpy).toHaveBeenCalledWith({ email });
    });
  });
});

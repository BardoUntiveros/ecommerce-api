import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { UsersRepository } from '../src/users/repository/users.repository';
import { DatabaseModule } from '../src/db/db.module';
import { EnvModule } from '../src/config/env.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, EnvModule, DatabaseModule],
      providers: [
        {
          provide: UsersRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) - should return unathorized error if user has not admin role', async () => {
    jest.spyOn(app.get(UsersRepository), 'find').mockResolvedValue([]);

    return request(app.getHttpServer()).get('/users').expect(401);
  });
});

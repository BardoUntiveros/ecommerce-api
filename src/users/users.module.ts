import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { User } from './users.entity';
import { OrdersRepository } from '../orders/orders.repository';
import { PaginationService } from '../pagination/service/pagination.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    JwtService,
    UsersService,
    PaginationService,
    UsersRepository,
    OrdersRepository,
  ],
})
export class UsersModule {}

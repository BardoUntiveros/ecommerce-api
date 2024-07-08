import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.entity';
import { OrderDetailsModule } from './details/order-details.module';
import { UsersService } from '../users/service/users.service';
import { OrderDetailsService } from './details/order-details.service';
import { UsersRepository } from '../users/repository/users.repository';
import { OrderDetailsRepository } from './details/order-details.repository';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [OrderDetailsModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [
    JwtService,
    OrdersRepository,
    OrdersService,
    UsersService,
    OrderDetailsService,
    UsersRepository,
    ProductsService,
    ProductsRepository,
    OrderDetailsRepository,
    CategoriesRepository,
  ],
})
export class OrdersModule {}

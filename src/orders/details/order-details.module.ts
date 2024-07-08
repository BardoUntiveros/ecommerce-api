import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsRepository } from './order-details.repository';
import { ProductsService } from '../../products/products.service';
import { OrderDetails } from './order-details.entity';
import { ProductsRepository } from '../../products/products.repository';
import { CategoriesRepository } from '../../categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  providers: [
    OrderDetailsRepository,
    OrderDetailsService,
    ProductsService,
    ProductsRepository,
    CategoriesRepository,
  ],
})
export class OrderDetailsModule {}

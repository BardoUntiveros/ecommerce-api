import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { PaginationService } from '../pagination/service/pagination.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [ProductsController],
  providers: [
    JwtService,
    ProductsService,
    ProductsRepository,
    CategoriesRepository,
    PaginationService,
  ],
})
export class ProductModule {}

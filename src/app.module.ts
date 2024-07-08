import {
  ConflictException,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './db/db.module';
import { OrderDetailsModule } from './orders/details/order-details.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FilesModule } from './files/files.module';
import { EnvModule } from './config/env.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesRepository } from './categories/categories.repository';
import { ProductsService } from './products/products.service';
import { ProductsRepository } from './products/products.repository';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProductModule,
    OrdersModule,
    CategoriesModule,
    OrderDetailsModule,
    CloudinaryModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CategoriesService,
    CategoriesRepository,
    ProductsService,
    ProductsRepository,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  // Custom logger middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  // Automatically seeding categories and products
  async onModuleInit() {
    try {
      await this.categoriesService.addCategories();
    } catch (error) {
      if (error instanceof ConflictException) {
        console.log('Categorías ya agregadas');
      } else {
        console.log('Error al agregar categorías: ', error);
      }
    }
    try {
      await this.productsService.addProducts();
    } catch (error) {
      if (error instanceof ConflictException) {
        console.log('Productos ya agregados');
      } else {
        console.log('Error al agregar productos: ', error);
      }
    }
  }
}

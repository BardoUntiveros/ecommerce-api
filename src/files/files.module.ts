import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files.entity';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [
    JwtService,
    CloudinaryService,
    FilesService,
    ProductsService,
    ProductsRepository,
    CategoriesRepository,
  ],
})
class FilesModule {}

export { FilesModule };

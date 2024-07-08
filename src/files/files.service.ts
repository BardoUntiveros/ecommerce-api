import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { File } from './files.entity';
import { GetProductDto } from '../products/dto/get-product.dto';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';

@Injectable()
class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async uploadImage(
    getProductDto: GetProductDto,
    file: Express.Multer.File,
  ): Promise<File> {
    // Products service handles if product exists
    const product = await this.productsService.getProduct(getProductDto);

    // Upload file to cloudinary
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    const { display_name, format, url } = cloudinaryResponse;
    const uploadedFile = await this.filesRepository.save({
      name: display_name,
      mimeType: format,
      imageUrl: url,
    });

    // Update product image url
    product.imageUrl = url;
    await this.productsRepository.save(product);
    return uploadedFile;
  }
}

export { FilesService };

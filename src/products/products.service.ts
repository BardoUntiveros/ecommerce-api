import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesRepository } from '../categories/categories.repository';
import { products } from './products';

@Injectable()
class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  getProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async getProduct(getProductDto: GetProductDto): Promise<Product> {
    const { id } = getProductDto;
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, categoryId } = createProductDto;

    // Check if product name already exists
    const product = await this.productsRepository.findByName(name);
    if (product) {
      throw new ConflictException(
        `Ya existe un producto con el nombre ${name}`,
      );
    }

    // Check if category exists
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(
        `La categoría con id ${categoryId} no fue encontrada`,
      );
    }

    // Create product
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async updateProduct(
    getProductDto: GetProductDto,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { id } = getProductDto;
    const { name, description, price, stock, imageUrl, categoryId } =
      updateProductDto;

    // Check if product exists
    const productToUpdate = await this.productsRepository.findById(id);
    if (!productToUpdate) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }

    // Check if product name already exists
    const otherProduct = await this.productsRepository.findByNameExcludingId(
      name,
      id,
    );
    if (otherProduct) {
      throw new ConflictException(
        `Ya existe un producto con el nombre ${name}`,
      );
    }

    // Check if category exists
    if (categoryId) {
      const category = await this.categoriesRepository.findById(categoryId);
      if (!category) {
        throw new NotFoundException(
          `La categoría con id ${categoryId} no fue encontrada`,
        );
      }
      // Updating product if category is provided
      await this.productsRepository.update(id, { category: category });
    }

    // Updating product
    delete updateProductDto.categoryId;
    await this.productsRepository.update(id, updateProductDto);

    const updatedProduct = await this.productsRepository.findById(id);
    return updatedProduct;
  }

  async reduceStockByOne(product: Product): Promise<void> {
    product.stock -= 1;
    await this.productsRepository.save(product);
  }

  async deleteProduct(getProductDto: GetProductDto): Promise<void> {
    const { id } = getProductDto;

    // Check if product exists
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }

    await this.productsRepository.delete(id);
  }

  async addProducts(): Promise<void> {
    // Get categories from products
    const categories = await this.categoriesRepository.find();

    // Iterate over products
    for (const product of products) {
      const category = categories.find(
        (category) => category.name === product.category,
      );

      // Check if product category exists
      if (!category) {
        throw new NotFoundException(
          `La categoría con nombre ${product.category} no fue encontrada`,
        );
      }

      // Check if product name already exists
      const otherProduct = await this.productsRepository.findByName(
        product.name,
      );
      if (otherProduct) {
        throw new ConflictException(
          `Ya existe un producto con el nombre ${product.name}`,
        );
      }

      // Create product
      const newProduct = new Product();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.stock = product.stock;
      newProduct.category = category;
      newProduct.imageUrl = product.imageUrl;
      await this.productsRepository.save(newProduct);
    }
  }
}

export { ProductsService };

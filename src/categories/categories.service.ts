import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { products } from '../products/products';

@Injectable()
class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories(): Promise<any> {
    return this.categoriesRepository.find();
  }

  async getCategory(getCategoryDto: GetCategoryDto): Promise<any> {
    const { id } = getCategoryDto;

    // Check if category exists
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(
        `La categoría con id ${id} no fue encontrada`,
      );
    }

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    // Check if category name already exists
    const category = await this.categoriesRepository.findByName(name);
    if (category) {
      throw new ConflictException(
        `Ya existe un producto con el nombre ${name}`,
      );
    }

    // Create category
    const categoryToCreate =
      this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(categoryToCreate);
  }

  async updateCategory(
    getCategoryDto: GetCategoryDto,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { id } = getCategoryDto;
    const { name } = updateCategoryDto;

    // Get category
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(
        `La categoría con id ${id} no fue encontrada`,
      );
    }

    // Check if the new category name already exists in other categories
    const otherCategory = await this.categoriesRepository.findByNameExcludingId(
      name,
      id,
    );
    if (otherCategory) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre ${name}`,
      );
    }
    category.name = name;

    return this.categoriesRepository.save(category);
  }

  async deleteCategory(getCategoryDto: GetCategoryDto): Promise<void> {
    const { id } = getCategoryDto;

    // Check if category exists
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(
        `La categoría con id ${id} no fue encontrada`,
      );
    }

    await this.categoriesRepository.delete(id);
  }

  async addCategories(): Promise<void> {
    // Get unique categories from products
    const categories = new Set<string>();
    for (const product of products) {
      categories.add(product.category);
    }

    // Check if categories already exist
    const existingCategories = await this.categoriesRepository.find();
    for (const category of existingCategories) {
      if (categories.has(category.name)) {
        throw new ConflictException(`La categoría ${category.name} ya existe`);
      }
    }

    // Save categories
    for (const category of categories) {
      await this.categoriesRepository.save({ name: category });
    }
  }
}

export { CategoriesService };

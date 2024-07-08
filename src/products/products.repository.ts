import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, Not, Repository } from 'typeorm';
import { Product } from './products.entity';
import { CategoriesRepository } from '../categories/categories.repository';

@Injectable()
class ProductsRepository extends Repository<Product> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly categoriesRepository: CategoriesRepository,
  ) {
    super(Product, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Product> {
    return await this.findOneBy({ id });
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.findBy({ id: In(ids) });
  }

  async findByName(name: string): Promise<Product> {
    return await this.findOneBy({ name });
  }

  async findByNameExcludingId(
    name: string,
    excludedId: string,
  ): Promise<Product> {
    return await this.findOne({ where: { name: name, id: Not(excludedId) } });
  }
}

export { ProductsRepository };

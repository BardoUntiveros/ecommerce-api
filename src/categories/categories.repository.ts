import { Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { DataSource, Not, Repository } from 'typeorm';

@Injectable()
class CategoriesRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Category> {
    return await this.findOneBy({ id });
  }

  async findByName(name: string): Promise<Category> {
    return await this.findOneBy({ name });
  }

  async findByNameExcludingId(
    name: string,
    excludedId: string,
  ): Promise<Category> {
    return await this.findOne({ where: { name: name, id: Not(excludedId) } });
  }
}

export { CategoriesRepository };

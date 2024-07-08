import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
@Unique(['name'])
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

export { Category };

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Category } from '../categories/categories.entity';

@Entity()
@Unique(['name'])
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({
    type: 'varchar',
    default:
      'https://saadashoes.websites.co.in/dummytemplate/img/product-placeholder.png',
  })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}

export { Product };

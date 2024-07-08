import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Role } from '../roles/roles.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    unique: true,
    length: 50,
  })
  email: string;

  @Column({ length: 50 })
  name: string;

  // Length 60 is for bcrypt with salt 10
  @Column({ length: 60 })
  password: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  phone: number;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @OneToMany(() => Order, (order) => order.user, { eager: true })
  orders: Order[];

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];
}

export { User };

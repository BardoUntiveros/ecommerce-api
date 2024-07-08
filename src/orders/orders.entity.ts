import { User } from '../users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './details/order-details.entity';

@Entity()
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetails)
  @JoinColumn()
  orderDetails: OrderDetails;
}

export { Order, OrderDetails };

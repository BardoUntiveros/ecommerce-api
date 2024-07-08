import { Injectable } from '@nestjs/common';
import { Order } from './orders.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
class OrdersRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Order> {
    return await this.findOneBy({ id });
  }

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.create();
    return await this.save(order);
  }
}

export { OrdersRepository };

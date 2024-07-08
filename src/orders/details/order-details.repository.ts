import { DataSource, Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class OrderDetailsRepository extends Repository<OrderDetails> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderDetails, dataSource.createEntityManager());
  }
}

export { OrderDetailsRepository };

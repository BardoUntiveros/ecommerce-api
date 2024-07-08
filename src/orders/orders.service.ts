import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetailsService } from './details/order-details.service';
import { UsersService } from '../users/service/users.service';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly usersService: UsersService,
  ) {}

  getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['user', 'orderDetails', 'orderDetails.products'],
    });
  }

  getOrder(getOrderDto: GetOrderDto): Promise<Order> {
    const { id } = getOrderDto;
    return this.ordersRepository.findById(id);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, productIds } = createOrderDto;
    const getUserDto = { id: userId };

    // Check if user exists
    const user = await this.usersService.getUser(getUserDto);
    if (!user) {
      throw new Error(`El usuario con id ${userId} no existe`);
    }

    // Creating order details
    const createOrderDetailsDto = { productIds };
    const orderDetails = await this.orderDetailsService.createOrderDetails(
      createOrderDetailsDto,
    );

    // Creating order (date is set by default)
    const newOrder = this.ordersRepository.create({
      user,
      orderDetails,
    });
    return await this.ordersRepository.save(newOrder);
  }

  async deleteOrder(getOrderDto: GetOrderDto): Promise<void> {
    const { id } = getOrderDto;

    // Check if order exists
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`La orden con id ${id} no fue encontrada`);
    }

    await this.ordersRepository.delete(id);
  }
}

export { OrdersService };

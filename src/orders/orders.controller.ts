import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns array of orders',
  })
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns an order',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Order not found by id',
  })
  getOrder(@Param('id') getOrderDto: GetOrderDto): Promise<Order> {
    return this.ordersService.getOrder(getOrderDto);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({
    status: 201,
    description: 'Created - Returns created order',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  @ApiResponse({
    status: 204,
    description: 'Deleted - Returns no content',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Order not found by id',
  })
  deleteOrder(@Param() getOrderDto: GetOrderDto): Promise<void> {
    return this.ordersService.deleteOrder(getOrderDto);
  }
}

import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from './order-details.repository';
import { OrderDetails } from './order-details.entity';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { ProductsService } from '../../products/products.service';
import { Product } from '../../products/products.entity';

@Injectable()
class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly productsService: ProductsService,
  ) {}

  async getAllOrderDetails(): Promise<OrderDetails[]> {
    return await this.orderDetailsRepository.find();
  }

  async getOneOrderDetails(id: string): Promise<OrderDetails> {
    return await this.orderDetailsRepository.findOneBy({ id });
  }

  async createOrderDetails(
    createOrderDetailsDto: CreateOrderDetailsDto,
  ): Promise<OrderDetails> {
    const { productIds } = createOrderDetailsDto;

    // Check if products exist
    const productsArray: Product[] = [];
    for (const getProductDto of productIds) {
      const product = await this.productsService.getProduct(getProductDto);
      productsArray.push(product);
    }

    // Check stock of products
    for (const product of productsArray) {
      if (product.stock <= 0) {
        throw new Error(`El producto ${product.name} no tiene stock`);
      }
      await this.productsService.reduceStockByOne(product);
    }

    // Calculate total price
    const totalPrice = productsArray.reduce(
      (accumulator, product) => accumulator + Number(product.price),
      0,
    );

    // Create order details
    const orderDetails = this.orderDetailsRepository.create({
      price: totalPrice,
      products: productsArray,
    });
    return await this.orderDetailsRepository.save(orderDetails);
  }
}

export { OrderDetailsService };

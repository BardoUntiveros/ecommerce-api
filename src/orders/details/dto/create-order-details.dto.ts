import { IsArray, IsDecimal, IsNotEmpty } from 'class-validator';
import { GetProductDto } from 'src/products/dto/get-product.dto';

class CreateOrderDetailsDto {
  @IsArray()
  productIds: GetProductDto[];
}

export { CreateOrderDetailsDto };

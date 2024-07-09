import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { GetProductDto } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { PaginationService } from '../pagination/service/pagination.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleName } from '../roles/roles.enum';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get()
  @HttpCode(206)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 206,
    description:
      'Partial content - Returns array of products based on page and limit query params',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid page or limit',
  })
  async getProducts(@Query() paginationDto: PaginationDto): Promise<{
    page: number;
    totalCount: number;
    data: Product[];
  }> {
    const products = await this.productsService.getProducts();
    return this.paginationService.paginate(products, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns a product',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Product not found by id',
  })
  getProduct(@Param() getProductDto: GetProductDto): Promise<any> {
    return this.productsService.getProduct(getProductDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'Partial content - Returns created product',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update product by id' })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns updated product',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Missing or invalid authentication token, or user has not required role',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Product not found by id',
  })
  updateProduct(
    @Param() getProductDto: GetProductDto,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(getProductDto, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({
    status: 204,
    description: 'Created - Returns no content',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Missing or invalid authentication token, or user has not required role',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Product not found by id',
  })
  deleteProduct(@Param() getProductDto: GetProductDto): Promise<void> {
    return this.productsService.deleteProduct(getProductDto);
  }

  @Post('seeder')
  @ApiOperation({ summary: 'Create predefined products' })
  @ApiResponse({
    status: 204,
    description: 'Created - Returns no content',
  })
  @ApiResponse({
    status: 404,
    description: "Not found - Product's category not found",
  })
  addProducts(): Promise<void> {
    return this.productsService.addProducts();
  }
}

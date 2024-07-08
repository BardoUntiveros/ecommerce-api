import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Ok -  Returns array of categories',
  })
  getCategories(): Promise<any> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns a category',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Category not found by id',
  })
  getCategory(@Param() getCategoryDto: GetCategoryDto): Promise<any> {
    return this.categoriesService.getCategory(getCategoryDto);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created - Returns created category',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid payload',
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns updated category',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Category not found by id',
  })
  updateCategory(
    @Param() getCategoryDto: GetCategoryDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<any> {
    return this.categoriesService.updateCategory(
      getCategoryDto,
      updateCategoryDto,
    );
  }

  @Delete(':id')
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
    description: 'Not Found - Category not found by id',
  })
  deleteCategory(@Param() getCategoryDto: GetCategoryDto): Promise<void> {
    return this.categoriesService.deleteCategory(getCategoryDto);
  }

  @Post('seeder')
  @ApiResponse({
    status: 201,
    description: 'Created - Returns no content',
  })
  @ApiResponse({
    status: 409,
    description: "Conflict - Product's category already exists",
  })
  addCategories(): Promise<void> {
    return this.categoriesService.addCategories();
  }
}

export { CategoriesController };

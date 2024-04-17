import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateCategorytDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { identity } from 'rxjs';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Post("/addcategory")
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategorytDto) {
    await this.categoryService.createProduct(createCategoryDto);
    return 'Category added successfully';
  }

  @Get()
  async getCategory(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.categoryService.getCategory(Number(page), Number(pageSize))
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Patch('/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() createCategorytDto: CreateCategorytDto,
  ) {
    const result = this.categoryService.updateCategory(Number(id), createCategorytDto);
    if (result) {
      return { result: 'Category Updated Successfully' };
    }

  }


  @Delete('/:id')
  async deleteCategory(@Param('id') id: number) {
    const result = this.categoryService.deleteCategory(Number(id));
    if (result) {
      return { result: 'Category Deleted Successfully' };
    }

  }

}
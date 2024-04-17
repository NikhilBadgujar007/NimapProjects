import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDataDto } from './dto/product-data.dto';

@Controller('/product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Post("/addproduct")
  async create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
     this.productService.createProduct(createProductDto);
     return "Product added successfully"
  }

  @Get()
  async getProduct(@Query('page') page : number ,@Query('pageSize') pageSize : number) {
    
    return this.productService.getProduct(Number(page),Number(pageSize))
  }

  @Get('/product-data')
  async getProductCategoryData(@Query('page') page : number ,@Query('pageSize') pageSize : number): Promise<ProductDataDto[]> {
    return this.productService.getProductData(Number(page) , Number(pageSize));
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number){
    return this.productService.getProductById(Number(id));
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() CreateProductDto: CreateProductDto,
  ) {
    await this.productService.updateProduct(Number(id), CreateProductDto);

    return { message: 'Product updated successfully'} }



  @Delete('/:id')
  async deleteCategory(@Param('id') id: number) {
    await this.productService.deleteProduct(Number(id));

    return "Delete product Sucessfully"
  }



}

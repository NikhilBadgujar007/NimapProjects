import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDataDto } from './dto/product-data.dto';


@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) { }

  async createProduct(createProductDto: CreateProductDto) {
    const { name, description, price, categoryId } = createProductDto;

    return this.prisma.prismaClient.product.create({
      data: {
        name,
        description,
        price,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
  }

  async getProduct(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    return this.prisma.prismaClient.product.findMany({
      skip,
      take :pageSize,

    })
  }


  async getProductById(id: number) {
    return this.prisma.prismaClient.product.findUnique({ where: { id : Number(id)} });
  }


  async updateProduct(id: number, createProductDto: CreateProductDto) {
    const { name, description, price, categoryId } = createProductDto;

    const existingCategory = await this.prisma.prismaClient.product.findUnique({ where: { id } });
    if (!existingCategory) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.prismaClient.product.update({
      where: { id },
      data: {
        name: name ?? existingCategory.name,
        description: description ?? existingCategory.description,
        price: price ?? existingCategory.price,
        categoryId: categoryId ?? existingCategory.categoryId,


      },
    });
  }

  async deleteProduct(id: number): Promise<void> {
    const existingProduct = await this.prisma.prismaClient.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.prismaClient.product.delete({ where: { id } });
  }


  async getProductData(page: number, pageSize: number): Promise<ProductDataDto[]> {

    const skip = (page - 1) * pageSize;

    const productsData = await this.prisma.prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        categoryId: true,
        category: { select: { name: true } },
      },
      skip,
      take: pageSize,
    });

    return productsData.map(({ id, name, categoryId, category }) => ({
      productId: id,
      productName: name,
      categoryId,
      categoryName: category?.name,
    }));
  }

}



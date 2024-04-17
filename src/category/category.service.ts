import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategorytDto } from './dto/create-category.dto';
import { PrismaClient } from '@prisma/client';
import { skip } from 'node:test';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService) { }

  async createProduct(createCategoryDto: CreateCategorytDto) {
    const { name, description } = createCategoryDto;

    return this.prisma.prismaClient.category.create({
      data: {
        name,
        description

      },
    });
  }

  getCategory(page: number, pageSize: number) {

    const skip = (page - 1) * pageSize

    return this.prisma.prismaClient.category.findMany({
      skip,
      take: pageSize,
    })
  }


  async getCategoryById(id: number) {
    return this.prisma.prismaClient.category.findUnique({ where: { id } });
  }

 
  async updateCategory(id: number, createCategoryDto: CreateCategorytDto) {
    const { name, description } = createCategoryDto;
    console.log("id", id);

    const existingCategory = await this.prisma.prismaClient.category.findUnique({ where: { id } });
   
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    return  await this.prisma.prismaClient.category.update({
      where: { id },
      data: {
        name: name ?? existingCategory.name,
        description: description ?? existingCategory.description,
      },
    });

  }

  async deleteCategory(id: number): Promise<void> {
    const existingCategory = await this.prisma.prismaClient.category.findUnique({ where: { id } });
  
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.prismaClient.category.delete({ where: { id } });
    
  }


}

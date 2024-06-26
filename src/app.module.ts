import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, ProductModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}

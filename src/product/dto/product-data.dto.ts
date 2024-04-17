import { IsNumber, IsString } from "class-validator";

export class ProductDataDto {
     
   
    productId: number;

    @IsString()
    productName: string;
    
    @IsNumber()
    categoryId: number;

    @IsString()
    categoryName: string;
    
  }

import { Product } from "@prisma/client";
import { IsString } from "class-validator";


export class CreateCategorytDto {
  
  
  id: number;


  @IsString()
  name: string;


  @IsString()
  description?: string;


  products?: Product[];
}



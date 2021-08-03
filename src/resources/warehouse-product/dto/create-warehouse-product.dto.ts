import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { Product } from "../../product/entities/product.entity";
import { Warehouse } from "../../warehouse/entities/warehouse.entity";

export class CreateWarehouseProductDto {

  @ApiProperty()
  warehouse: Warehouse;
  
  @ApiProperty()
  product: Product;

  @IsString()
  @IsOptional()
  @ApiProperty()
  barcode: String;
  
  @IsDateString()
  @IsOptional()
  @ApiProperty()
  mfgAt?: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  expAt?: Date;

}

import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseProductDto } from './create-warehouse-product.dto';

import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { Product } from "src/resources/product/entities/product.entity";
import { Warehouse } from "src/resources/warehouse/entities/warehouse.entity";

export class UpdateWarehouseProductDto extends PartialType(CreateWarehouseProductDto) {

  @ApiProperty()
  @IsOptional()
  warehouse: Warehouse;
  
  @ApiProperty()
  @IsOptional()
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

import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsOptional, IsString } from "class-validator";

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: String;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  address: String;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: String;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  province: String;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: String;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  countryCode: String;

  @IsString()
  @IsOptional()
  @ApiProperty()
  postCode: String;

}

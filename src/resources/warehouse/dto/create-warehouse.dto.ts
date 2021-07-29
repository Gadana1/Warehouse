import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsOptional, IsPostalCode, IsString } from "class-validator";

export class CreateWarehouseDto {
  
  @IsString()
  @ApiProperty()
  name: String;
  
  @IsString()
  @ApiProperty()
  address: String;

  @IsString()
  @ApiProperty()
  city: String;
  
  @IsString()
  @ApiProperty()
  province: String;

  @IsString()
  @ApiProperty()
  country: String;
  
  @IsString()
  @ApiProperty()
  countryCode: String;

  @IsString()
  @ApiProperty()
  postCode: String;

}

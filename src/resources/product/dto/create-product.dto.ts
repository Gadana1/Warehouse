import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @ApiProperty()
  name: String;
  
  @IsString()
  @ApiProperty()
  description: String;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active: Boolean;

}

import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active: boolean;
}

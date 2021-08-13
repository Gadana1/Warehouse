import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active: boolean;
}

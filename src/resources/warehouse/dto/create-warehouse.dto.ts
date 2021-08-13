import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  province: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  countryCode: string;

  @IsString()
  @ApiProperty()
  postCode: string;
}

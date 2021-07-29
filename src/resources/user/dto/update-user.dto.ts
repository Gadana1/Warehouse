import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: String;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  password: String;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active: Boolean;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  suspendedAt: Date;

}

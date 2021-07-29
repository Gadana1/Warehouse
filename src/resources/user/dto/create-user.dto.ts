import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  
  @IsString()
  @ApiProperty()
  name: String;
  
  @IsString()
  @ApiProperty()
  @IsEmail()
  email: String;
  
  @IsString()
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

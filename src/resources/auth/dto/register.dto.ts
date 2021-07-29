import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  
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
  
}

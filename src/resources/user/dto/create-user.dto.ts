import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsArray, IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from "../../role/entities/role.entity";

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
  suspendedAt?: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: [Role]
  })
  roles?: Role[];

}

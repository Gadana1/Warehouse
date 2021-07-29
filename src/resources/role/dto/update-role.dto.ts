import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Permission } from '../permissions/permission.enum';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  permissions: Permission[];
}

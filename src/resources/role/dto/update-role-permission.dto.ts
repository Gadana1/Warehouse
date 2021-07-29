import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Permission } from "../permissions/permission.enum";

export class UpdateRolePermissionDto {
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  permission: Permission;
  
}

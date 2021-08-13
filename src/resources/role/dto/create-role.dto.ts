import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsArray, IsString } from 'class-validator';
import { Permission } from '../permissions/permission.enum';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ApiProperty()
  permissions: Permission[];
}

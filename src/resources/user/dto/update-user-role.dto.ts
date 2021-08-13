import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class UpdateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  roleId: number;
}

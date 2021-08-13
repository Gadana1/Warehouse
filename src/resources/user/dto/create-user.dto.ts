import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active: boolean;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  suspendedAt?: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    type: [Role],
  })
  roles?: Role[];
}

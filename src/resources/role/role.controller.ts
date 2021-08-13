import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@nestjsx/crud';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Permission } from './permissions/permission.enum';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { Permissions } from './permissions/permissions.decorator';

// Use crud library to
// Generates basic CRUD operations
@Crud({
  // Define Model to use for CRUD
  model: {
    type: Role,
  },
  // Override DTOs
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto,
  },
  // Add decorators to CRUD routes
  routes: {
    createManyBase: {
      decorators: [Permissions(Permission.RoleCreateMany)],
    },
    createOneBase: {
      decorators: [Permissions(Permission.RoleCreateOne)],
    },
    updateOneBase: {
      decorators: [Permissions(Permission.RoleUpdateOne)],
    },
    replaceOneBase: {
      decorators: [Permissions(Permission.RoleReplaceOne)],
    },
    deleteOneBase: {
      decorators: [Permissions(Permission.RoleDeleteOne)],
    },
    recoverOneBase: {
      decorators: [Permissions(Permission.RoleRecoverOne)],
    },
    getManyBase: {
      decorators: [Permissions(Permission.RoleReadAll)],
    },
    getOneBase: {
      decorators: [Permissions(Permission.RoleReadOne)],
    },
  },
  // Modify query result
  query: {
    exclude: ['password'],
  },
})
@ApiBearerAuth()
@ApiTags('Role')
@Controller('api/role')
export class RoleController implements CrudController<Role> {
  constructor(public service: RoleService) {}

  /**
   * Get list of all permissions
   * @param req
   */
  @Permissions(Permission.RoleReadAllPermission)
  @ApiOperation({
    summary: 'Get list of all permissions',
  })
  @Get('permissions')
  public getPermissions(): Permission[] {
    return this.service.getPermissions();
  }

  /**
   * Add Permission to Role
   * @param req
   * @param dto
   */
  @Permissions(Permission.RoleAddPermission)
  @ApiOperation({
    summary: 'Add Permission to Role',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
  })
  @ApiBody({
    type: UpdateRolePermissionDto,
  })
  @Put('permission/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async addRole(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: UpdateRolePermissionDto,
  ): Promise<void | Role> {
    if (dto) {
      const result = await this.service.addPermission(req, dto.permission);
      if (result) {
        return result;
      }
    }
    throw new HttpException('Failed to add permission', 400);
  }

  /**
   * Remove Permission from Role
   * @param req
   * @param dto
   */
  @Permissions(Permission.RoleRemovePermission)
  @ApiOperation({
    summary: 'Remove Permission from Role',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
  })
  @ApiBody({
    type: UpdateRolePermissionDto,
  })
  @Delete('permission/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async removeRole(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: UpdateRolePermissionDto,
  ): Promise<void | Role> {
    if (dto) {
      const result = await this.service.removePermission(req, dto.permission);
      if (result) {
        return result;
      }
    }
    throw new HttpException('Failed to remove permission', 400);
  }

  /**
   * Recover deleted User
   * @param req
   */
  @Permissions(Permission.RoleRecoverOne)
  @ApiOperation({
    summary: 'Recover deleted Role',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Role ID',
  })
  @Get('recover/:id')
  @UseInterceptors(CrudRequestInterceptor)
  public recoverOne(@ParsedRequest() req: CrudRequest): Promise<void | Role> {
    return this.service.recoverOne(req);
  }
}

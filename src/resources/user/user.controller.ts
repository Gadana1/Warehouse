import { Body, Controller, Delete, Get, HttpException, Put, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Permissions } from '../role/permissions/permissions.decorator';
import { Permission } from '../role/permissions/permission.enum';

// Use crud library to
// Generates basic CRUD operations
@Crud({
  // Define Model to use for CRUD
  model: {
    type: User,
  },
  // Add decorators to CRUD routes
  routes: {
    createManyBase: {
      decorators: [
        Permissions(Permission.UserCreateMany)
      ]
    },
    createOneBase: {
      decorators: [
        Permissions(Permission.UserCreateOne)
      ]
    },
    updateOneBase: {
      decorators: [
        Permissions(Permission.UserUpdateOne)
      ]
    },
    replaceOneBase: {
      decorators: [
        Permissions(Permission.UserReplaceOne)
      ]
    },
    deleteOneBase: {
      decorators: [
        Permissions(Permission.UserDeleteOne)
      ]
    },
    recoverOneBase: {
      decorators: [
        Permissions(Permission.UserRecoverOne)
      ]
    },
    getManyBase: {
      decorators: [
        Permissions(Permission.UserReadAll)
      ]
    },
    getOneBase: {
      decorators: [
        Permissions(Permission.UserReadOne)
      ]
    }
  },
  // Override DTOs
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  // Modify query result
  query: {
    exclude: [
      'password'
    ],
    join: {
      roles: {
        allow: [],
        eager: true
      },
    },
  }
})

@ApiBearerAuth()
@ApiTags('User')
@Controller('api/user')
export class UserController implements CrudController<User> {

  constructor(public service: UserService) { }


  get base(): CrudController<User> {
    return this;
  }


  /**
   * Get current user info
   * @param req
   * @param dto
   */
  @ApiOperation({
    summary: "Get current user info",
  })
  @ApiResponse({
    type: User
  })
  @Get('info')
  @UseInterceptors(CrudRequestInterceptor)
  public getInfo(@ParsedRequest() req: CrudRequest): Promise<void | User> {
    return this.service.getOne(req);
  }


  /**
   * Add Role to User
   * @param req
   * @param dto
   */
  @Permissions(Permission.UserAddRole)
  @ApiOperation({
    summary: "Add Role to User",
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "User ID"
  })
  @ApiBody({
    type: UpdateUserRoleDto
  })
  @Put('role/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async addRole(@ParsedRequest() req: CrudRequest, @Body() dto: UpdateUserRoleDto): Promise<void | User> {
    if (dto) {
      const result = await this.service.addRole(req, dto.roleId);
      if (result) {
        return result;
      }
    }
    throw new HttpException('Failed to add role', 400);
  }


  /**
   * Remove Role from User
   * @param req
   * @param dto
   */
  @Permissions(Permission.UserRemoveRole)
  @ApiOperation({
    summary: "Remove Role from User",
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "User ID"
  })
  @ApiBody({
    type: UpdateUserRoleDto
  })
  @Delete('role/:id')
  @UseInterceptors(CrudRequestInterceptor)
  async removeRole(@ParsedRequest() req: CrudRequest, @Body() dto: UpdateUserRoleDto): Promise<void | User> {
    if (dto) {
      const result = await this.service.removeRole(req, dto.roleId);
      if (result) {
        return result;
      }
    }
    throw new HttpException('Failed to remove role', 400);
  }


  /**
   * Recover deleted User
   * @param req
   */
  @Permissions(Permission.UserRecoverOne)
  @ApiOperation({
    summary: "Recover deleted User",
  })
  @ApiParam({
    name: 'id',
    type: Number
  })
  @Get('recover/:id')
  @UseInterceptors(CrudRequestInterceptor)
  public recoverOne(@ParsedRequest() req: CrudRequest): Promise<void | User> {
    return this.service.recoverOne(req);
  }


  /**
   * Reject or suspend user account
   * @param req
   */
  @Permissions(Permission.UserSuspendOne)
  @ApiOperation({
    summary: "Reject or suspend user account",
  })
  @ApiParam({
    name: 'id',
    type: Number
  })
  @Get('suspend/:id')
  @UseInterceptors(CrudRequestInterceptor)
  public suspend(@ParsedRequest() req: CrudRequest): Promise<void | User> {
    return this.service.suspend(req);
  }


  /**
   * Approve or activate user account"
   * @param req
   */
  @Permissions(Permission.UserActivateOne)
  @ApiOperation({
    summary: "Approve or activate user account",
  })
  @ApiParam({
    name: 'id',
    type: Number
  })
  @Get('activate/:id')
  @UseInterceptors(CrudRequestInterceptor)
  public activate(@ParsedRequest() req: CrudRequest): Promise<void | User> {
    return this.service.activate(req);
  }
}

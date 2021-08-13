import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { Warehouse } from './entities/warehouse.entity';
import { Permissions } from '../role/permissions/permissions.decorator';
import { Permission } from '../role/permissions/permission.enum';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

// Use crud library to 
// Generates basic CRUD operations
@Crud({
  // Define Model to use for CRUD
  model: {
    type: Warehouse,
  },
  // Add decorators to CRUD routes
  routes: {
    createManyBase: {
      decorators: [
        Permissions(Permission.WarehouseCreateMany)
      ]
    },
    createOneBase: {
      decorators: [
        Permissions(Permission.WarehouseCreateOne)
      ]
    },
    updateOneBase: {
      decorators: [
        Permissions(Permission.WarehouseUpdateOne)
      ]
    },
    replaceOneBase: {
      decorators: [
        Permissions(Permission.WarehouseReplaceOne)
      ]
    },
    deleteOneBase: {
      decorators: [
        Permissions(Permission.WarehouseDeleteOne)
      ]
    },
    recoverOneBase: {
      decorators: [
        Permissions(Permission.WarehouseRecoverOne)
      ]
    },
    getManyBase: {
      decorators: [
        Permissions(Permission.WarehouseReadAll)
      ]
    },
    getOneBase: {
      decorators: [
        Permissions(Permission.WarehouseReadOne)
      ]
    }
  },
  // Override DTOs
  dto: {
    create: CreateWarehouseDto,
    update: UpdateWarehouseDto,
  }
})

@ApiBearerAuth()
@ApiTags('Warehouse')
@Controller('api/warehouse')
export class WarehouseController implements CrudController<Warehouse>{
  
  constructor(public service: WarehouseService) {}
  

  get base(): CrudController<Warehouse> {
    return this;
  }


  /**
   * Recover deleted Warehouse
   * @param req
   */
   @Permissions(Permission.WarehouseRecoverOne)
   @ApiOperation({
     summary: "Recover deleted Warehouse",
   })
   @ApiParam({
     name: 'id',
     type: Number
   })
   @Get('recover/:id')
   @UseInterceptors(CrudRequestInterceptor)
   public recoverOne(@ParsedRequest() req: CrudRequest): Promise<void | Warehouse> {
     return this.service.recoverOne(req);
   }
 
}

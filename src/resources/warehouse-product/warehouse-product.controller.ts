import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { CreateWarehouseProductDto } from './dto/create-warehouse-product.dto';
import { UpdateWarehouseProductDto } from './dto/update-warehouse-product.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { WarehouseProduct } from './entities/warehouse-product.entity';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { Permissions } from '../role/permissions/permissions.decorator';
import { Permission } from '../role/permissions/permission.enum';

// Use crud library to 
// Generates basic CRUD operations
@Crud({
  // Define Model to use for CRUD
  model: {
    type: WarehouseProduct,
  },
  // Add decorators to CRUD routes
  routes: {
    createManyBase: {
      decorators: [
        Permissions(Permission.WarehouseProductCreateMany)
      ]
    },
    createOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductCreateOne)
      ]
    },
    updateOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductUpdateOne)
      ]
    },
    replaceOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductReplaceOne)
      ]
    },
    deleteOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductDeleteOne)
      ]
    },
    recoverOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductRecoverOne)
      ]
    },
    getManyBase: {
      decorators: [
        Permissions(Permission.WarehouseProductReadAll)
      ]
    },
    getOneBase: {
      decorators: [
        Permissions(Permission.WarehouseProductReadOne)
      ]
    },
  },
  // Override DTOs
  dto: {
    create: CreateWarehouseProductDto,
    update: UpdateWarehouseProductDto,
  },
  // Modify query result
  query: {
    join: {
      product: {
        eager: true
      },
      warehouse: {
        eager: true
      },
    },
  }
})

@ApiBearerAuth()
@ApiTags('Warehouse Product')
@Controller('api/warehouse-product')
export class WarehouseProductController implements CrudController<WarehouseProduct> {
  
  constructor(public service: WarehouseProductService) {}

  get base(): CrudController<WarehouseProduct> {
    return this;
  }

  /**
   * Recover deleted Warehouse Product
   * @param req
   */
   @Permissions(Permission.UserRecoverOne)
   @ApiOperation({
     summary: "Recover deleted Warehouse Product",
   })
   @ApiParam({
     name: 'id',
     type: Number
   })
   @Get('recover/:id')
   @UseInterceptors(CrudRequestInterceptor)
   public recoverOne(@ParsedRequest() req: CrudRequest): Promise<void | WarehouseProduct> {
     return this.service.recoverOne(req);
   }
}
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Crud, CrudController, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { Product } from './entities/product.entity';
import { Permissions } from '../role/permissions/permissions.decorator';
import { Permission } from '../role/permissions/permission.enum';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

// Use crud library to
// Generates basic CRUD operations
@Crud({
  // Define Model to use for CRUD
  model: {
    type: Product,
  },
  // Add decorators to CRUD routes
  routes: {
    createManyBase: {
      decorators: [
        Permissions(Permission.ProductCreateMany)
      ]
    },
    createOneBase: {
      decorators: [
        Permissions(Permission.ProductCreateOne)
      ]
    },
    updateOneBase: {
      decorators: [
        Permissions(Permission.ProductUpdateOne)
      ]
    },
    replaceOneBase: {
      decorators: [
        Permissions(Permission.ProductReplaceOne)
      ]
    },
    deleteOneBase: {
      decorators: [
        Permissions(Permission.ProductDeleteOne)
      ]
    },
    recoverOneBase: {
      decorators: [
        Permissions(Permission.ProductRecoverOne)
      ]
    },
    getManyBase: {
      decorators: [
        Permissions(Permission.ProductReadAll)
      ]
    },
    getOneBase: {
      decorators: [
        Permissions(Permission.ProductReadOne)
      ]
    }
  },
  // Override DTOs
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
  }
})

@ApiBearerAuth()
@ApiTags('Product')
@Controller('api/product')
export class ProductController implements CrudController<Product> {

  constructor(public service: ProductService) { }

  get base(): CrudController<Product> {
    return this;
  }

  /**
   * Recover deleted User
   * @param req
   */
  @Permissions(Permission.UserRecoverOne)
  @ApiOperation({
    summary: "Recover deleted Product",
  })
  @ApiParam({
    name: 'id',
    type: Number
  })
  @Get('recover/:id')
  @UseInterceptors(CrudRequestInterceptor)
  public recoverOne(@ParsedRequest() req: CrudRequest): Promise<void | Product> {
    return this.service.recoverOne(req);
  }
}

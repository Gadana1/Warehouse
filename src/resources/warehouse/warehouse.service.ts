import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseProductService } from '../warehouse-product/warehouse-product.service';

@Injectable()
export class WarehouseService extends TypeOrmCrudService<Warehouse>  {

  constructor(@InjectRepository(Warehouse) repo: Repository<Warehouse>, 
              // Inject forward ref of service to handle circular dependencies
              @Inject(forwardRef(() => WarehouseProductService)) private warehouseProductService: WarehouseProductService) {
    super(repo);
  }


  /**
   * Get One - Override to customize
   * 
   * @override
   * @param {CrudRequest} req
   * @returns {Promise<Warehouse>}
   */
   async getOne(req: CrudRequest): Promise<Warehouse>{

    const warehouse = await super.getOne(req);
    
    // Get Count of products in the warehouse
    if(warehouse) {
      warehouse.products = await this.warehouseProductService.getCountForWarehouse(warehouse.id);
      warehouse.productsAvailable = await this.warehouseProductService.getCountForWarehouse(warehouse.id, true);
    }

    return warehouse;
  }

  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req
   * @returns {Promise<User>}
   */
   async deleteOne(req: CrudRequest): Promise<Warehouse> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }
}

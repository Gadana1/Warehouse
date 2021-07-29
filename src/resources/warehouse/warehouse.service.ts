import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService extends TypeOrmCrudService<Warehouse>  {
  
  constructor(@InjectRepository(Warehouse) repo: Repository<Warehouse>) {
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

    req.options.query.join = { 'warehouseProducts': { eager: true }}
    const warehouse = await super.getOne(req);
    
    // Get Count of products in the warehouse
    if(warehouse && warehouse.warehouseProducts) {
      warehouse.products = warehouse.warehouseProducts.length;
      warehouse.productsAvailable = warehouse.warehouseProducts.filter(wh => wh.deletedAt === null).length;
      delete warehouse.warehouseProducts;
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

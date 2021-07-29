import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { WarehouseProduct } from './entities/warehouse-product.entity';

@Injectable()
export class WarehouseProductService extends TypeOrmCrudService<WarehouseProduct> {
  
  constructor(@InjectRepository(WarehouseProduct) repo: Repository<WarehouseProduct>, 
              private warehouseService: WarehouseService,
              private productService: ProductService) {
    super(repo);
  }
  
  /**
   * Create One record
   * @override
   * @param {CrudRequest} req 
   * @param {DeepPartial<WarehouseProduct>} dto 
   * @returns {Promise<WarehouseProduct>}
   */
   async createOne(req: CrudRequest, dto: DeepPartial<WarehouseProduct>): Promise<WarehouseProduct> {
    // Validate Warehouse
    if(dto.warehouse){
      if(!(await this.warehouseService.findOne(Number(dto.warehouse.id)))){
        throw new NotFoundException(`Failed to find warehouse with id ${dto.warehouse.id}`)
      }
    }
    // Validate Product
    if(dto.product){
      if(!(await this.productService.findOne(Number(dto.product.id)))){
        throw new NotFoundException(`Failed to find product with id ${dto.product.id}`)
      }
    }
    return super.createOne(req, dto);
  }

  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
   async deleteOne(req: CrudRequest): Promise<WarehouseProduct> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }
}

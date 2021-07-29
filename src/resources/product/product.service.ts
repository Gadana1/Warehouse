import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest, JoinOption, JoinOptions } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo);
  }

  /**
   * Get One - Override to customize
   * 
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<Product>}
   */
  async getOne(req: CrudRequest): Promise<Product>{

    req.options.query.join = { 'warehouseProducts': { eager: true }}
    const product = await super.getOne(req);
    
    // Get Count of products in stock
    if(product && product.warehouseProducts) {
      product.stock = product.warehouseProducts.length;
      product.stockAvailable = product.warehouseProducts.filter(wh => wh.deletedAt === null).length;
      delete product.warehouseProducts;
    }

    return product;
  }

  
  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
   async deleteOne(req: CrudRequest): Promise<Product> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }
}

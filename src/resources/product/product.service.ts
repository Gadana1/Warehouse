import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { WarehouseProductService } from '../warehouse-product/warehouse-product.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    // Inject forward ref of service to handle circular dependencies
    @Inject(forwardRef(() => WarehouseProductService))
    private warehouseProductService: WarehouseProductService,
  ) {
    super(repo);
  }

  /**
   * Get One - Override to customize
   *
   * @override
   * @param {CrudRequest} req
   * @returns {Promise<Product>}
   */
  async getOne(req: CrudRequest): Promise<Product> {
    const product = await super.getOne(req);

    // Get Count of products in stock
    if (product) {
      product.stock = await this.warehouseProductService.getCountForProduct(
        product.id,
      );
      product.stockAvailable =
        await this.warehouseProductService.getCountForProduct(product.id, true);
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

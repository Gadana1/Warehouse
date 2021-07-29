import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo);
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

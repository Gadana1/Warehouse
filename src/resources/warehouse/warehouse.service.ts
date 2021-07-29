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
   * Delete One record
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
   async deleteOne(req: CrudRequest): Promise<Warehouse> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }
}

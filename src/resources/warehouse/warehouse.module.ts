import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './entities/warehouse.entity';
import { WarehouseProductModule } from '../warehouse-product/warehouse-product.module';

@Module({
  imports: [
    // Forward ref of modules to hande circular dependencies
    forwardRef(() => WarehouseProductModule),
    TypeOrmModule.forFeature([Warehouse])
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  // Export service to be used in other modules that imports this module
  exports: [WarehouseService]
})
export class WarehouseModule {}

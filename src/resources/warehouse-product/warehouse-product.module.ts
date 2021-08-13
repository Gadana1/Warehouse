import { forwardRef, Module } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { WarehouseProductController } from './warehouse-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseProduct } from './entities/warehouse-product.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    // Forward ref of modules to hande circular dependencies
    forwardRef(() => WarehouseModule),
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([WarehouseProduct]),
  ],
  controllers: [WarehouseProductController],
  providers: [WarehouseProductService],
  // Export service to be used in other modules that imports this module
  exports: [WarehouseProductService],
})
export class WarehouseProductModule {}

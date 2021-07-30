import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { WarehouseProductModule } from '../warehouse-product/warehouse-product.module';

@Module({
  imports: [
    // Forward ref of modules to hande circular dependencies
    forwardRef(() => WarehouseProductModule),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  // Export service to be used in other modules that imports this module
  exports: [ProductService],
})
export class ProductModule {}

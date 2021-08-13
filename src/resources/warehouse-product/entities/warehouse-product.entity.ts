import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Product } from '../../product/entities/product.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'warehouse_products',
})
export class WarehouseProduct {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: () => Warehouse,
  })
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseProducts)
  warehouse: Warehouse;

  @ApiProperty({
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.warehouseProducts)
  product: Product;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  barcode: string;

  @Column({
    type: 'datetime',
    default: null,
    comment: 'Manufactured date of product',
  })
  @ApiProperty()
  mfgAt: Date;

  @Column({
    type: 'datetime',
    default: null,
    comment: 'Expiry date of product',
  })
  @ApiProperty()
  expAt: Date;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  @ApiProperty()
  deletedAt: Date;
}

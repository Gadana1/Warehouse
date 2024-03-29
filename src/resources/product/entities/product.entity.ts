import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseProduct } from '../../warehouse-product/entities/warehouse-product.entity';

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  description: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  active: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  @ApiProperty()
  deletedAt: Date;

  @OneToMany(() => WarehouseProduct, (wp) => wp.product)
  warehouseProducts: WarehouseProduct[];

  @ApiProperty({ required: false })
  stock?: number;

  @ApiProperty({ required: false })
  stockAvailable?: number;
}

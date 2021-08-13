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
  name: 'warehouse',
})
export class Warehouse {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  province: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  country: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @ApiProperty()
  countryCode: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @ApiProperty()
  postCode: string;

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
  products?: number;

  @ApiProperty({ required: false })
  productsAvailable?: number;
}

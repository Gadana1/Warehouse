import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WarehouseProduct } from "../../warehouse-product/entities/warehouse-product.entity";

@Entity({
  name: 'warehouse'
})
export class Warehouse {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: Number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  name: String;

  @Column({ type: 'text', nullable: true})
  @ApiProperty()
  address: String;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  city: String;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  province: String;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty()
  country: String;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @ApiProperty()
  countryCode: String;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @ApiProperty()
  postCode: String;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  @ApiProperty()
  deletedAt: Date;

  @OneToMany(() => WarehouseProduct, wp => wp.product)
  warehouseProducts: WarehouseProduct[];

}

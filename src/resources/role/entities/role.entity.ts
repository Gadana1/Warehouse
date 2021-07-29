import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "../permissions/permission.enum";

@Entity({
  name: 'role'
})
export class Role {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: Number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  name: String;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  @Column({ type: 'json' })
  permissions: Permission[];

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}

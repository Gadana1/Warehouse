import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Role } from "../../role/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: 'user'
})
export class User {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: Number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  name: String;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false})
  @ApiProperty()
  email: String;

  @Column({ type: 'varchar', length: 256, default: null })
  password: String;

  @Column({ type: 'boolean', default: false})
  @ApiProperty()
  active: Boolean;

  @Column({ type: 'datetime', default: null})
  @ApiProperty()
  suspendedAt: Date;

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
  @ManyToMany(() => Role, role => role.users, { eager: true })
  // Only add for owner entity
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id'},
  }) 
  roles: Role[];
}

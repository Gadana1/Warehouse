import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Role } from "../../role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  @ApiProperty()
  email: String;

  @Column({ type: 'varchar', length: 256, default: null })
  password: String;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  active: Boolean;

  @Column({ type: 'datetime', default: null })
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

  @ManyToMany(() => Role, role => role.users, { eager: true })
  @JoinTable({ // Only add for owner entity - for many to many relationshp
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  // Hooks
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(String(this.password), salt);
  }

}

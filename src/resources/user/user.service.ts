import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyDto, CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {

  constructor(@InjectRepository(User) repo: Repository<User>, private roleService: RoleService) {
    super(repo);
  }

  /**
   * Save User
   * @param {CreateUserDto} dto 
   * @returns {Promise<User>}
   */
  async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  /**
   * Create new User
   * @param {CreateUserDto} dto 
   * @returns {Promise<User>}
   */
  async create(dto: CreateUserDto): Promise<User> {
    // Hash Password
    if (dto.password) {
      const salt = bcrypt.genSaltSync(10);
      dto.password = bcrypt.hashSync(String(dto.password), salt);
    }
    return this.repo.save(dto);
  }

  /**
   * Update User
   * @param {Number} id 
   * @param {CreateUserDto} dto 
   * @returns {Promise<User>}
   */
  async update(id: Number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(+id);
    if (user) {
      // Hash Password
      if (dto.password) {
        const salt = bcrypt.genSaltSync(10);
        dto.password = bcrypt.hashSync(String(dto.password), salt);
      }
      return this.repo.save(dto);
    }
    return null;
  }

  /**
   * Create One record
   * @override
   * @param {CrudRequest} req 
   * @param {DeepPartial<User>} dto 
   * @returns {Promise<User>}
   */
  async createOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
    // Hash Password
    if (dto.password) {
      const salt = bcrypt.genSaltSync(10);
      dto.password = bcrypt.hashSync(String(dto.password), salt);
    }
    return super.createOne(req, dto);
  }

  /**
   * Create Many records
   * @override
   * @param {CrudRequest} req 
   * @param {CreateManyDto} dto 
   * @returns {Promise<User>}
   */
  async createMany(req: CrudRequest, dto: CreateManyDto<User>): Promise<User[]> {
    if (dto.bulk) {
      dto.bulk = dto.bulk.map((item) => {
        // Hash Password
        if (item.password) {
          const salt = bcrypt.genSaltSync(10);
          item.password = bcrypt.hashSync(String(item.password), salt);
        }
        return item;
      })
    }
    return super.createMany(req, dto);
  }

  /**
   * Update One record
   * @override
   * @param {CrudRequest} req 
   * @param {DeepPartial<User>} dto 
   * @returns {Promise<User>}
   */
  async updateOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
    // Hash Password
    if (dto.password) {
      const salt = bcrypt.genSaltSync(10);
      dto.password = bcrypt.hashSync(String(dto.password), salt);
    }
    return super.updateOne(req, dto);
  }

  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
  async deleteOne(req: CrudRequest): Promise<User> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }

  /**
   * Add Role
   * @override
   * @param {CrudRequest} req 
   * @param {Number} roleId 
   * @returns {Promise<User>}
   */
   async addRole(req: CrudRequest, roleId: Number): Promise<User> {
    const user = await this.getOneOrFail(req)
    if (user && roleId) {
      // Add role if not exist
      user.roles = user.roles || [];
      if (!user.roles.find(role => role.id === roleId)) {
        user.roles.push((await this.roleService.findOne(Number(roleId))));
      }
      return this.repo.save(user);
    }
    return null;
  }

  /**
   * Remove Role from User
   * @override
   * @param {CrudRequest} req 
   * @param {Number} roleId 
   * @returns {Promise<User>}
   */
  async removeRole(req: CrudRequest, roleId: Number): Promise<User> {
    const user = await this.getOneOrFail(req)
    if (user && user.roles && roleId) {
      user.roles = user.roles.filter(role => role.id !== roleId)
      return this.repo.save(user);
    }
    return null;
  }

  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
   async activate(req: CrudRequest): Promise<User> {
    const user = await this.getOneOrFail(req)
    if (user) {
      user.suspendedAt = null;
      user.active = true;
      if(!user.roles || user.roles.length === 0){
        user.roles = [
          await this.roleService.findOne({ where: { name: "User" } })
        ]
      }
      return this.save(user);
    }
    throw new NotFoundException();
  }

  /**
   * Suspend account
   * @override
   * @param {CrudRequest} req 
   * @returns {Promise<User>}
   */
   async suspend(req: CrudRequest): Promise<User> {
    const user = await this.getOneOrFail(req)
    if (user) {
      user.suspendedAt = new Date();
      return this.save(user);
    }
    throw new NotFoundException();
  }

}

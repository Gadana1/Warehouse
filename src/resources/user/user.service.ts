import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyDto, CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo: Repository<User>,
    private roleService: RoleService,
  ) {
    super(repo);
  }

  /**
   * Save User
   * @param {User} dto
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
    // Validate Role
    if (dto.roles) {
      for (const role of dto.roles) {
        if (!(await this.roleService.findOne(Number(role.id)))) {
          throw new NotFoundException(`Failed to find role with id ${role.id}`);
        }
      }
    }
    return this.repo.save(this.repo.create(dto));
  }

  /**
   * Create One record
   * @override
   * @param {CrudRequest} req
   * @param {DeepPartial<User>} dto
   * @returns {Promise<User>}
   */
  async createOne(req: CrudRequest, dto: DeepPartial<User>): Promise<User> {
    // Validate Role
    if (dto.roles) {
      for (const role of dto.roles) {
        if (!(await this.roleService.findOne(Number(role.id)))) {
          throw new NotFoundException(`Failed to find role with id ${role.id}`);
        }
      }
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
  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<User>,
  ): Promise<User[]> {
    if (dto.bulk) {
      dto.bulk = await Promise.all(
        dto.bulk.map(async (item) => {
          // Validate Role
          if (item.roles) {
            for (const role of item.roles) {
              if (!(await this.roleService.findOne(Number(role.id)))) {
                throw new NotFoundException(
                  `Failed to find role with id ${role.id}`,
                );
              }
            }
          }
          return item;
        }),
      );
    }
    return super.createMany(req, dto);
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
  async addRole(req: CrudRequest, roleId: number): Promise<User> {
    const user = await this.getOneOrFail(req);
    if (user && roleId) {
      // Add role if not exist
      user.roles = user.roles || [];
      if (!user.roles.find((role) => role.id === roleId)) {
        user.roles.push(await this.roleService.findOne(Number(roleId)));
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
  async removeRole(req: CrudRequest, roleId: number): Promise<User> {
    const user = await this.getOneOrFail(req);
    if (user && user.roles && roleId) {
      user.roles = user.roles.filter((role) => role.id !== roleId);
      return this.repo.save(user);
    }
    return null;
  }

  /**
   * Activate account
   * @override
   * @param {CrudRequest} req
   * @returns {Promise<User>}
   */
  async activate(req: CrudRequest): Promise<User> {
    const user = await this.getOneOrFail(req);
    if (user) {
      user.suspendedAt = null;
      user.active = true;
      if (!user.roles || user.roles.length === 0) {
        user.roles = [
          await this.roleService.findOne({ where: { name: 'User' } }),
        ];
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
    const user = await this.getOneOrFail(req);
    if (user) {
      user.suspendedAt = new Date();
      return this.save(user);
    }
    throw new NotFoundException();
  }
}

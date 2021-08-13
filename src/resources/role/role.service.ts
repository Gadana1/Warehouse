import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from './permissions/permission.enum';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo);
  }

  /**
   * Create new Role
   * @param {CreateRoleDto} role
   * @returns {Promise<Role>}
   */
  async create(role: CreateRoleDto): Promise<Role> {
    return this.repo.save(role);
  }

  /**
   * Get list of permissions
   * @returns {String[]}
   */
  getPermissions(): Permission[] {
    return Object.values(Permission);
  }

  /**
   * Update One record
   * @override
   * @param {CrudRequest} req
   * @param {DeepPartial<Role>} dto
   * @returns {Promise<User>}
   */
  async updateOne(req: CrudRequest, dto: DeepPartial<Role>): Promise<Role> {
    const role = await this.getOneOrFail(req);
    if (role && dto.permissions) {
      // Add permission if not exist
      const permissions = [];
      for (const permission of dto.permissions) {
        if (
          !role.permissions ||
          !role.permissions.find((item) => item === permission)
        ) {
          permissions.push(permission);
        }
      }
      dto.permissions = permissions;
    }
    return super.updateOne(req, dto);
  }

  /**
   * Delete One record
   * @override
   * @param {CrudRequest} req
   * @returns {Promise<Role>}
   */
  async deleteOne(req: CrudRequest): Promise<Role> {
    return this.repo.softRemove(await this.getOneOrFail(req));
  }

  /**
   * Add Permission
   * @override
   * @param {CrudRequest} req
   * @param {Permission} permission
   * @returns {Promise<Role>}
   */
  async addPermission(req: CrudRequest, permission: Permission): Promise<Role> {
    const role = await this.getOneOrFail(req);
    if (role && permission) {
      // Add permission if not exist
      role.permissions = role.permissions || [];
      if (!role.permissions.find((perm) => perm === permission)) {
        role.permissions.push(permission);
      }
      return this.repo.save(role);
    }
    return null;
  }

  /**
   * Remove Permission from User
   * @param {CrudRequest} req
   * @param {Permission} permission
   * @returns {Promise<Role>}
   */
  async removePermission(
    req: CrudRequest,
    permission: Permission,
  ): Promise<Role> {
    const role = await this.getOneOrFail(req);
    if (role && permission) {
      role.permissions = role.permissions.filter((perm) => perm !== permission);
      return this.repo.save(role);
    }
    return null;
  }
}

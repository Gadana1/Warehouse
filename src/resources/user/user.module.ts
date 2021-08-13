import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { DEFAULT_ROLES, Role } from '../role/entities/role.entity';
import { Permission } from '../role/permissions/permission.enum';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  // Export service to be used in other modules that imports this module
  exports: [UserService],
})
export class UserModule {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {
    // Set up default administrator
    this.setupDefaultAdmin();
  }

  // TODO
  /**
   * Set up default Administrative user on first launch
   */
  async setupDefaultAdmin() {
    // If default admin exist
    if (process.env.DEFAULT_ADMIN_EMAIL && process.env.DEFAULT_ADMIN_PASSWORD) {
      // Set up user
      if (!(await this.userService.count())) {
        const user = await this.userService.create({
          name: 'Administrator',
          email: process.env.DEFAULT_ADMIN_EMAIL,
          password: process.env.DEFAULT_ADMIN_PASSWORD,
          active: true,
          suspendedAt: null,
        });

        if (user) {
          // Set up role
          let role: Role = null;
          if (!(await this.roleService.count())) {
            // Admin Role
            role = await this.roleService.create({
              name: DEFAULT_ROLES.ADMINISTRATOR,
              permissions: [Permission.Admin],
            });

            // User Role
            this.roleService.create({
              name: DEFAULT_ROLES.USER,
              permissions: [
                Permission.AdminProduct,
                Permission.AdminWarehouse,
                Permission.AdminWarehouseProduct,
              ],
            });
          } else {
            role = await this.roleService.findOne({
              where: { name: DEFAULT_ROLES.ADMINISTRATOR },
            });
          }

          // Add Role to User
          if (role) {
            user.roles = [role];
            this.userService.save(user);
          }
        }
      }
    }
  }
}

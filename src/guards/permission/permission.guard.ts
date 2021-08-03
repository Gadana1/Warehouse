import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../resources/role/permissions/permissions.decorator';
import { Permission } from '../../resources/role/permissions/permission.enum';
import { User } from '../../resources/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector?: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    // Check is user has any of the required permissions
    const user: User = context.switchToHttp().getRequest()?.user;
    if(user) {
        return requiredPermissions.some((reqPermission) => {
            return user.roles?.some((role) => {
                return role.permissions?.includes(Permission.Admin) || role.permissions?.includes(reqPermission) || role.permissions?.some((permission) => this.checkWildCard(reqPermission, permission));
            })
        });
    }
    return false;
  }

  /**
   * Check if wild card permission matches
   * @param required 
   * @param current 
   * @returns 
   */
  checkWildCard(required: string, current: string){
    const [reqFeature, reqAccess] = required.split(':');
    const [curFeature, curAccess] = current.split(':');
    return (reqFeature && curFeature && reqAccess && curAccess) && ((reqFeature === curFeature && (reqAccess === curAccess || curAccess === "*")) || (curFeature === "*" && curAccess === "*"))
  }
}

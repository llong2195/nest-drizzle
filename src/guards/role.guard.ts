import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CurrentUserDto } from '@/base/base.dto';
import { MetadataEnum } from '@/enums/metadata.enum';
import { RoleEnum } from '@/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      MetadataEnum.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      MetadataEnum.ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length < 1) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user: CurrentUserDto = req['user'];
    if (!user) {
      return false;
    }

    if (requiredRoles.includes(RoleEnum.ALL)) {
      return true;
    }

    return true;
  }
}

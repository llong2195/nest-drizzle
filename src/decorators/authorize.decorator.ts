import { applyDecorators, UseGuards } from '@nestjs/common';

import { RoleEnum } from '@/enums/role.enum';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { RoleGuard } from '@/guard/role.guard';
import { Roles } from './role.decorators';

export const Authorize = (...roles: RoleEnum[]) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(RoleGuard),
    Roles(...roles),
  );
};

import { SetMetadata } from '@nestjs/common';

import { MetadataEnum } from '@/enums/metadata.enum';
import { RoleEnum } from '@/enums/role.enum';

/**
 * It takes a list of roles and adds them to the metadata of the decorated function
 * @param {RoleEnum[]} roles - RoleEnum[] - The roles that are allowed to access the route.
 */
export const Roles = (...roles: RoleEnum[]) =>
  SetMetadata(MetadataEnum.ROLES_KEY, roles);

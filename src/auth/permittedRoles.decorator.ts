import { SetMetadata } from '@nestjs/common';

export const ROLES_METADATA_KEY = 'roles';

export const permittedRoles = (...roles: string[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles);

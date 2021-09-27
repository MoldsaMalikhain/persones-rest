import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'magic.const';
export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

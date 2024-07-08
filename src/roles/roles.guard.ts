import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { IUserPayload } from '../auth/auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    // Retrieving user from request object, which was assigned by AuthGuard
    const { user }: { user: IUserPayload } = context
      .switchToHttp()
      .getRequest();

    console.log(requiredRoles);
    console.log(user.roles);

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

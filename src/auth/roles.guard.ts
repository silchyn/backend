import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_METADATA_KEY } from './permittedRoles.decorator';
import { Role } from 'src/roles/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permittedRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') || [];

    if (!request.headers.authorization || type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Not authorized');
    }

    try {
      request.user = this.jwtService.verify(token);

      return (
        !permittedRoles ||
        request.user.roles.some(({ value }: Role) =>
          permittedRoles.includes(value),
        )
      );
    } catch {
      throw new ForbiddenException('Access forbidden');
    }
  }
}

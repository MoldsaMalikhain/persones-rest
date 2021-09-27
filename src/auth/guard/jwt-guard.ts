import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from 'magic.const';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndOverride<any>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles);
    try {
      const authheader = req.headers.authorization;
      const bearer = authheader.split(' ')[0];
      const token = authheader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException();
      req.person = this.jwtService.verify(token);

      if (roles.length > 0) {
        return roles[0].split(' ').includes(req.person.role);
      }

      return true;
    } catch (error) {
      throw new HttpException(
        { message: 'Autharization fail', error },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

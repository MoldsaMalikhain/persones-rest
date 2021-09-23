import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authheader = req.headers.authorization;
      const bearer = authheader.split(' ')[0];
      const token = authheader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException();

      req.person = this.jwtService.verify(token);

      if (!req.person.admin) throw new UnauthorizedException();

      return req.person.admin;
    } catch (error) {
      throw new HttpException(
        { message: 'Autharization fail', error },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

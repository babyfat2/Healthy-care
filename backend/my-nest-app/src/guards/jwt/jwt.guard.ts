import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { EROLE } from 'src/global/globalEnum';
import { Reflector } from '@nestjs/core';


@Injectable()
export class JwtGuard extends AuthGuard('jwt')  {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const validRoles = [EROLE.PATIENT, EROLE.CLINICAL_DOCTOR, EROLE.HOSPITAL];
    const checkRole = validRoles.includes(user.position);

    if (!checkRole) {
      throw new UnauthorizedException('Unauthorized access');
    }
    return true;

  }

  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}

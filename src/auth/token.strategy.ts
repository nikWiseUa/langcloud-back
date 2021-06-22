import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_TOKEN } from './constants';
import { Request } from 'express';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class TokenStrategy implements CanActivate {
  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.cookies?.token as string | undefined;
    console.log(request.cookies);
    return token && !!(await this.validate(token));
  }

  async validate(token: string): Promise<User> {
    return await this.authService.findByToken(token);
  }
}

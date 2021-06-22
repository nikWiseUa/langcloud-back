import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TOKEN_STRATEGY_TOKEN } from 'src/auth/constants';
import { TokenStrategy } from '../auth/token.strategy';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(@Inject(TOKEN_STRATEGY_TOKEN) private strategy: TokenStrategy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await this.strategy.canActivate(context);
    if (canActivate) {
      const request = context.switchToHttp().getRequest() as Request;
      const token = request.cookies.token;
      const user = await this.strategy.validate(token);
      request.user = user;
      return true;
    }
    throw new UnauthorizedException('fucking auth');
  }
}

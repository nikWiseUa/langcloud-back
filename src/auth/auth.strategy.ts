import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_TOKEN } from './constants';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: AuthService) {
    super();
  }

  async validate(username: string, pass: string): Promise<any> {
    return await this.authService.auth(username, pass);
  }
}

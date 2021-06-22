import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { TokenStrategy } from './token.strategy';

@Module({
  providers: [AuthService, AuthStrategy, TokenStrategy],
  exports: [AuthService, TokenStrategy],
  imports: [PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}

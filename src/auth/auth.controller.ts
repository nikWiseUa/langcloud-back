import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { authenticate } from 'passport';
import { User } from 'src/schemas/user.schema';
import { TokenGuard } from 'src/shared/token.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('tokenAuth')
  async tokenAuth(@Req() req: Request): Promise<boolean> {
    console.log(req.cookies.token);
    const authenticated = await this.authService.isValid(req.cookies.token);
    console.log(authenticated);
    return authenticated;
  }
  @UseGuards(LocalAuthGuard)
  @Post(['login', 'signin'])
  async userAuth(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    const token = await this.authService.login(req.user as any);
    res.cookie('token', token);
    res.send(token);
  }
  @Post(['signup', 'register'])
  async signup(@Body() body: SignUpDto, @Res() res: Response) {
    const user = await this.authService.signUp(body);
    res.cookie('token', user.token);
    res.send(user);
  }
  @UseGuards(TokenGuard)
  @Post(['signout', 'logout'])
  async signout(@Req() req: Request) {
    this.authService.signOut(req.user as User);
    return;
  }
}

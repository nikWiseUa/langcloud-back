import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { TokenGuard } from 'src/shared/token.guard';
import { UserInfoDto } from './dto/user-info.dto';
import { ProfileService } from './profile.service';

// @UseGuards(TokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // need validate
  @Post('update')
  profileUpdate(@Req() req: Request, @Body() body: UserInfoDto) {
    const token = req.cookies?.token as string;
    return this.profileService.updateUserInfo(token, body);
  }

  @Get('info')
  profileInfo(@Req() req: Request) {
    const token = req.cookies?.token as string | undefined;
    return this.profileService.fetchInfo(token);
  }

  @Get('stats')
  getProfileStats(@Req() req: Request) {
    const token = req.cookies?.token as string | undefined;
    return this.profileService.getUserStatistic(token);
  }

  @Get('lang')
  getText(@Query() query, @Res() res: Response) {
    res.sendFile(join(__dirname, `profile.${query.lang}.json`));
  }
}

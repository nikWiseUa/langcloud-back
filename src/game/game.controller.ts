import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { AUTH_SERVICE_TOKEN } from 'src/auth/constants';
import { Game, GameDoc } from 'src/schemas/game.schema';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    @InjectModel(Game.name) private gameModel: Model<GameDoc>,
    @Inject(AUTH_SERVICE_TOKEN) private authService: AuthService,
  ) {}

  async user(req) {
    return await this.authService.findByToken(req.cookies.token);
  }

  @Post('start')
  async startGame(@Body() body, @Req() req) {
    const { username } = await this.user(req);
    const game = {
      stage: 'pending',
      description: ' ',
      id: Date.now(),
      settings: body,
      username,
      round: 0,
    };
    this.gameModel.create(game);
    return;
  }

  @Post('endGame')
  endGame(@Body() body) {
    console.log(body);
  }
}

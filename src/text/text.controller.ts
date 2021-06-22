import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Get, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { ProfileService } from 'src/profile/profile.service';
import { Text, TextDoc } from 'src/schemas/text.schema';
import { WORD_SERVISE } from 'src/words/costants';
import { WordsService } from 'src/words/words.service';

@Controller('text')
export class TextController {
  constructor(
    private profileService: ProfileService,
    @Inject(WORD_SERVISE) private wordsServise: WordsService,
    @InjectModel(Text.name) private textModel: Model<TextDoc>,
  ) {}

  @Get()
  all() {
    return this.textModel.find();
  }

  @Get('random')
  getRandomText() {
    return this.textModel.findOne();
  }

  @Post('learned')
  learnedWord(@Body() body, @Req() req: Request) {
    this.profileService.addrReadText(req.cookies.token, body.text);
  }

  @Get(':id')
  async getCurrentText(@Param('id') id: string) {
    const text = await this.textModel.findOne({ id });
    return text;
  }
}

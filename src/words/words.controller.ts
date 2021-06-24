import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Word } from 'src/schemas/word.schema';
import { WordsService } from './words.service';
import { Request } from 'express';
import { ProfileService } from 'src/profile/profile.service';

@Controller('words')
export class WordsController {
  constructor(
    private profileService: ProfileService,
    private readonly wordsService: WordsService,
  ) {}

  @Get()
  all() {
    return this.wordsService.all();
  }

  @Get('category')
  async getByCategory(
    @Req() req: Request,
    @Query('id') id: string,
    @Query('type') type: string,
  ): Promise<string | Word[]> {
    let words;
    if (type === 'learn') {
      words = await this.wordsService.findByCategoryNolearned(
        req.cookies.token,
        id,
      );
    } else if (type === 'test') {
      words = await this.wordsService.findInTestCategory(id);
    } else {
      words = await this.wordsService.findByCategory(id);
    }
    // req.cookies.token
    return words;
  }

  @Get('text')
  getByText(@Query('text') text: string): Promise<Word[]> {
    return this.wordsService.findByText(text);
  }

  @Post('learned')
  learnedWord(@Body() body, @Req() req: Request) {
    // console.log(req.cookies.token, body.word);
    this.profileService.addLearnedWord(req.cookies.token, body.word);
    // добавляем в профиль выученое слово, добавляем в схему профиля обьект с датами по выученым словам
  }

  @Get('content')
  getByContent(@Query('content') content: string): Promise<Word> {
    const word = this.wordsService.findByContent(content);

    return word;
  }

  @Get(':id')
  getWordById(@Param('id') id: string): Promise<Word> {
    console.log(id);
    return this.wordsService.findById(id);
  }
}

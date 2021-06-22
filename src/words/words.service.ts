import { Body, Get, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileService } from 'src/profile/profile.service';
import { Word, WordDoc } from 'src/schemas/word.schema';
import { Request } from 'express';

@Injectable()
export class WordsService {
  constructor(
    private profileService: ProfileService,
    @InjectModel(Word.name) private wordModel: Model<WordDoc>,
  ) {}

  all() {
    return 'all';
  }

  async findById(id: string): Promise<Word> {
    return await this.wordModel.findOne({ id });
  }

  async findByCategory(catrgoryId: string): Promise<Word[]> {
    return await this.wordModel.find({ catrgoryId });
  }
  async findByContent(content: string): Promise<Word> {
    return await this.wordModel.findOne({ en: content });
  }

  async findByCategoryNolearned(
    token: string,
    catrgoryId: string,
  ): Promise<Word[]> {
    const profile = await this.profileService.fetchInfo(token);
    let words;
    if (profile.learned?.words) {
      console.log(profile.learned.words[catrgoryId]);

      words = await this.wordModel.find({
        catrgoryId,
        id: { $nin: profile.learned.words[catrgoryId] },
      });
    } else {
      words = await this.wordModel.find({
        catrgoryId,
      });
    }
    return words;
  }

  async findByText(text): Promise<Word[]> {
    const rx = new RegExp(`.*${text}.*`, 'i');
    const words = await this.wordModel.find({ en: rx });
    return words;
  }

  @Get('resolve')
  async resolveLearning(req) {
    console.log(await this.profileService.fetchInfo(req.cookies.token));
  }
}

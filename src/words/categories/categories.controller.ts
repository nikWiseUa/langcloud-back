import { Body, Controller, Get, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDoc } from 'src/schemas/category.schema';
import { ProfileService } from 'src/profile/profile.service';
import { WORD_SERVISE } from 'src/words/costants';
import { WordsService } from '../words.service';

// @UseGuards(TokenGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(WORD_SERVISE) private wordsServise: WordsService,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}
  @Get('')
  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }
  @Get('/test')
  async findTestCategories(): Promise<Category[]> {
    const cats = await this.categoryModel.find();
    const testedCats = [];
    for (let i = 0; i < cats.length; i++) {
      const wordsInCat = await this.wordsServise.findByCategory(cats[i].id);
      wordsInCat.length >= 15 && testedCats.push(cats[i]);
    }
    return testedCats;
  }
}

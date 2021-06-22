import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDoc } from 'src/schemas/category.schema';
import { Request } from 'express';
import { ProfileService } from 'src/profile/profile.service';
import { TokenGuard } from 'src/shared/token.guard';

// @UseGuards(TokenGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private profileService: ProfileService,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDoc>,
  ) {}
  @Get('')
  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }
}

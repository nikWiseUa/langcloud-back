import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from 'src/schemas/word.schema';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
  imports: [
    ProfileModule,
    CategoriesModule,
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
})
export class WordsModule {}

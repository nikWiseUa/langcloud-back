import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { Text, TextSchema } from 'src/schemas/text.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }]),
    ProfileModule,
  ],
  providers: [TextService],
  controllers: [TextController],
  exports: [],
})
export class TextModule {}

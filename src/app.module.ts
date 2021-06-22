import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { WordsModule } from './words/words.module';
import { TextModule } from './text/text.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test1'),
    ProfileModule,
    WordsModule,
    TextModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

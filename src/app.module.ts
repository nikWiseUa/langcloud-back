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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    ProfileModule,
    WordsModule,
    TextModule,
    GameModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.LINK),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(process.env.LINK);

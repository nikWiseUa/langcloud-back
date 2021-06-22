import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AUTH_SERVICE_TOKEN, TOKEN_STRATEGY_TOKEN } from 'src/auth/constants';
import { TokenStrategy } from 'src/auth/token.strategy';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WORD_SERVISE } from 'src/words/costants';
import { WordsModule } from 'src/words/words.module';
import { WordsService } from 'src/words/words.service';

@Global()
@Module({
  imports: [
    AuthModule,
    WordsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useExisting: AuthService,
    },
    {
      provide: TOKEN_STRATEGY_TOKEN,
      useExisting: TokenStrategy,
    },
    {
      provide: WORD_SERVISE,
      useExisting: WordsService,
    },
  ],
  exports: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useExisting: AuthService,
    },
    {
      provide: TOKEN_STRATEGY_TOKEN,
      useExisting: TokenStrategy,
    },
    {
      provide: WORD_SERVISE,
      useExisting: WordsService,
    },
    MongooseModule,
  ],
})
export class SharedModule {}

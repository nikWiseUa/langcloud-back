import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserInfoDoc = UserInfo & Document;

@Schema()
export class UserInfo {
  @Prop({ required: true })
  name: string;

  @Prop()
  about?: string;

  @Prop({ tequired: true, type: Object })
  statistic?: {
    textsRead?: number;
    wordsLearned?: number;
    lore?: {
      wordsLearned?: number;
      [key: string]: string | number;
    };
  };
  @Prop({ tequired: true, type: Object })
  learned?: {
    words?: {
      [key: string]: [string?];
    };
    texts?: [string?];
  };

  // learned;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

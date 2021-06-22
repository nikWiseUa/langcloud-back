import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordDoc = Word & Document;

@Schema()
export class Word {
  @Prop({ required: true })
  en: string;

  @Prop({ required: true })
  ru?: string;

  @Prop({ required: true })
  ua?: string;

  @Prop({ required: true })
  id?: string;

  @Prop({ required: true })
  image?: string;

  @Prop({ required: true })
  catrgoryId?: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);

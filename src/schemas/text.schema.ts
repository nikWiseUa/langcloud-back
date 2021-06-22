import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TextDoc = Text & Document;

@Schema()
export class Text {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  en: string;

  @Prop({ required: true })
  ru?: string;

  @Prop({ required: true })
  ua?: string;

  @Prop()
  dificulty: 'easy' | 'medium' | 'hard';

  @Prop({ required: true })
  sentences: [];

  @Prop({ required: true })
  words: [];
}

export const TextSchema = SchemaFactory.createForClass(Text);

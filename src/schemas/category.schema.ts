import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDoc = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  en: string;

  @Prop({ required: true })
  ru?: string;

  @Prop({ required: true })
  ua?: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  id?: string;

  @Prop({ required: true })
  isGameCategory?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

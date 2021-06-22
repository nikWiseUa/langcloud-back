import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDoc = Game & Document;

@Schema()
export class Game {
  @Prop()
  description?: string;

  @Prop({ required: true })
  id?: string;

  @Prop({ required: true })
  stage?: string;

  @Prop({ required: true, type: Object })
  round?: number;

  @Prop({ required: true, type: Object })
  settings?: { [key: string]: string | number };
}

export const GameSchema = SchemaFactory.createForClass(Game);

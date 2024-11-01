import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  authorId: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

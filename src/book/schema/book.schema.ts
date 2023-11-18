import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user.schema';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;

  @Prop()
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book)

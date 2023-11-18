import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly author: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'please enter correct category here' })
  readonly category: Category;
}

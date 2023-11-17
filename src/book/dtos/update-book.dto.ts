import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsEnum(Category, { message: 'please enter correct category' })
  readonly category: Category;
}

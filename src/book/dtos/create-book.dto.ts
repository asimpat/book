import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schema/book.schema';
import { User } from 'src/auth/schema/user.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'please enter correct category here' })
  readonly category: Category;

  @IsEmpty({ message: 'you can not pass user id' })
  readonly user: User;
}

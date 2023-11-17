import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    // PAGENATION
    // Number of response per page
    const resPerPage = 2;
    // get current page number
    const currentPage = Number(query.page) || 1;
    // pages to skip
    const skip = resPerPage * (currentPage - 1);

    // IMPLEMENTING THE SEARCH
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async addBook(book: Book): Promise<Book> {
    const createBook = await this.bookModel.create(book);
    return createBook;
  }

  // Get books by Id
  async getBookById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id); // this will show if it i correct id or not
    const findBook = await this.bookModel.findById(id);
    if (!findBook) {
      throw new NotFoundException('Book not found');
    }
    return findBook;
  }

  // update Book by id
  async updateBookById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  // delete book
  async deleteBook(id: string): Promise<Book> {
    const removeBook = await this.bookModel.findByIdAndDelete(id);
    if (!removeBook) {
      throw new NotFoundException('Book not found');
    }
    return removeBook;
  }
}

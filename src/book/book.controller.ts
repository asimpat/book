/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.findAll(query);
  }

  @Post('add')
    @UseGuards(AuthGuard())
  async addBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return await this.bookService.addBook(book, req.user);
    
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBookById(id, book); 
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBook(id);
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/dto/create-book.dto';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Post()
  async createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(body.title);
  }
}

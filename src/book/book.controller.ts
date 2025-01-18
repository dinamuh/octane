import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}  // Ensure BookService is injected

  @Get()
  async getBooks() {
    return this.bookService.getBooks();
  }

  @Post()
  async createBook(@Body() createBookDto: { title: string }) {
    return this.bookService.createBook(createBookDto.title);
  }
}

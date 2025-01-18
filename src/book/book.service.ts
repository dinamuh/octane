import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(public bookRepository: BookRepository) {}

  async createBook(name: string): Promise<Book> {
    const existingBook = await this.bookRepository.getBookByTitle(name);
    if (existingBook) {
      throw new BadRequestException('Already Have Book with this Name !');
    }
    return this.bookRepository.createBook(name);
  }

  getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }
}

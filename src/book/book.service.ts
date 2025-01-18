import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(public bookRepository: BookRepository) {}

  async createBook(title: string): Promise<Book> {
    const existingBook = await this.bookRepository.getBookByTitle(title);
    if (existingBook) {
      throw new BadRequestException('Already Have Book with this Title !');
    }
    return this.bookRepository.createBook(title);
  }

  getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }
}

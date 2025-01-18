import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(public bookRepository: BookRepository) {}

  async createBook(title: string) {
    const existingCustomer = await this.bookRepository.getBookByTitle(title);
    if (existingCustomer) {
      throw new BadRequestException('Already Have Customer with this Email!!');
    }
    return this.bookRepository.createBook(title);
  }

  getBooks() {
    return this.bookRepository.getBooks();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  createBook(name: string, pagesNumber: number): Promise<Book> {
    const book = this.bookRepository.create({ name, pagesNumber });
    return this.bookRepository.save(book);
  }

  getBookByTitle(name: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { name } });
  }

  getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }
}

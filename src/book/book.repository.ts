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

  createBook(title: string): Promise<Book> {
    const book = this.bookRepository.create({ title });
    return this.bookRepository.save(book);
  }

  getBookByTitle(title: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { title } });
  }

  getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }
}

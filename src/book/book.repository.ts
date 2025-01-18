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

  createBook(title: string) {
    const book = this.bookRepository.create({ title });
    return this.bookRepository.save(book);
  }

  getBookByTitle(title: string) {
    return this.bookRepository.findOne({ where: { title } });
  }

  getBooks() {
    return this.bookRepository.find();
  }
}

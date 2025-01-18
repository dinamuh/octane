import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'book', 'startPage', 'endPage'])
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startPage: number;

  @Column()
  endPage: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}

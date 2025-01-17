import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startPage: number;

  @Column()
  endPage: number;

  @ManyToOne(() => User, (user) => user.recommendations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, (book) => book.recommendations)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}

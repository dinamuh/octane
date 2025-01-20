import { Recommendation } from '../recommendation/recommendadtion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'pages_number', type: 'int' })
  pagesNumber: number;

  @OneToMany(() => Recommendation, (recommendation) => recommendation.book)
  recommendations: Recommendation[];
}

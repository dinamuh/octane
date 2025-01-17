import { Recommendation } from 'src/recommendation/recommendadtion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Recommendation, (recommendation) => recommendation.book)
  recommendations: Recommendation[];
}

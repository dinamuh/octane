import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Recommendation } from '../recommendation/recommendadtion.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];
}

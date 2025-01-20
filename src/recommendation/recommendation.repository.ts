import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommendation } from './recommendadtion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendationRepository {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepository: Repository<Recommendation>,
  ) {}

  createRecommendation(
    user,
    book,
    endPage,
    startPage,
  ): Promise<Recommendation> {
    const recommendation = this.recommendationRepository.create({
      user,
      book,
      endPage,
      startPage,
    });
    return this.recommendationRepository.save(recommendation).catch((e) => {
      throw e;
    });
  }

  getRecommendations(): Promise<Recommendation[]> {
    return this.recommendationRepository.find().catch((e) => {
      throw e;
    });
  }

  async getTopBooksByReading() {
    return this.recommendationRepository
      .createQueryBuilder('recommendation')
      .innerJoinAndSelect('recommendation.book', 'book')
      .select('recommendation.book_id', 'bookId')
      .addSelect('recommendation.startPage', 'startPage')
      .addSelect('recommendation.endPage', 'endPage')
      .addSelect('book.pagesNumber', 'pagesNumber')
      .addSelect('book.name', 'bookName')
      .getRawMany()
      .catch((e) => {
        throw e;
      });
  }
}

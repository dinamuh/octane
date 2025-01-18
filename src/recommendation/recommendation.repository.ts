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
    return this.recommendationRepository.save(recommendation);
  }

  getRecommendations(): Promise<Recommendation[]> {
    return this.recommendationRepository.find();
  }
}

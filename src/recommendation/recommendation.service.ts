import { Injectable } from '@nestjs/common';
import { Recommendation } from './recommendadtion.entity';
import { RecommendationRepository } from './recommendation.repository';

@Injectable()
export class RecommendationService {
  constructor(public recommendationRepository: RecommendationRepository) {}

  async createRecommendation(
    user,
    book,
    endPage,
    startPage,
  ): Promise<Recommendation> {
    return this.recommendationRepository.createRecommendation(
      user,
      book,
      endPage,
      startPage,
    );
  }
}

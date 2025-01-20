import { Injectable } from '@nestjs/common';
import { Recommendation } from './recommendadtion.entity';
import { RecommendationRepository } from './recommendation.repository';
import { RecommendationHelper } from './recommendation.helper';

@Injectable()
export class RecommendationService {
  constructor(
    public recommendationRepository: RecommendationRepository,
    public recommendationHelper: RecommendationHelper,
  ) {}

  async createRecommendation(
    user,
    book,
    endPage,
    startPage,
  ): Promise<Recommendation> {
    return this.recommendationRepository
      .createRecommendation(user, book, endPage, startPage)
      .catch((e) => {
        throw e;
      });
  }

  async getTopBooksByReading() {
    const recommendations = await this.recommendationRepository
      .getTopBooksByReading()
      .catch((e) => {
        throw e;
      });

    return await this.recommendationHelper.calculateUniquePages(
      recommendations,
    );
  }
}

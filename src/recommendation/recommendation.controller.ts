import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommentationDto } from './dto/create-recommendation.dto';
import { Recommendation } from './recommendadtion.entity';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  async createRecommendation(
    @Body() body: CreateRecommentationDto,
  ): Promise<Recommendation> {
    return this.recommendationService.createRecommendation(
      body.userId,
      body.bookId,
      body.endPage,
      body.startPage,
    );
  }
}

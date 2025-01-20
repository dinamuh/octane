import { Body, Controller, Get, Post } from '@nestjs/common';
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
      body.user_id,
      body.book_id,
      body.end_page,
      body.start_page,
    );
  }

  @Get('/top-books')
  async getTop() {
    return this.recommendationService.getTopBooksByReading();
  }
}

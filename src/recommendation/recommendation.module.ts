import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from './recommendadtion.entity';
import { RecommendationRepository } from './recommendation.repository';
import { RecommendationHelper } from './recommendation.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation])],
  controllers: [RecommendationController],
  providers: [
    RecommendationRepository,
    RecommendationHelper,
    RecommendationService,
  ],
})
export class RecommendationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { BookService } from './book/book.service';
import { RecommendationService } from './recommendation/recommendation.service';
import { UserController } from './user/user.controller';
import { BookController } from './book/book.controller';
import { RecommendationController } from './recommendation/recommendation.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your-username',
      password: 'your-password',
      database: 'reading_recommendation',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    BookController,
    RecommendationController,
  ],
  providers: [AppService, UserService, BookService, RecommendationService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { BookController } from './book/book.controller';
import { RecommendationController } from './recommendation/recommendation.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    BookModule,
    RecommendationModule,
    UserModule,
  ],
  controllers: [AppController, UserController, RecommendationController],
  providers: [],
})
export class AppModule {}

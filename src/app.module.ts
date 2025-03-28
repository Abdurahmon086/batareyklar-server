import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroModule } from './modules/hero/hero.module';
import { NewsModule } from './modules/news/news.module';
import { PartnersModule } from './modules/partners/partners.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { TeamModule } from './modules/team/team.module';
import { CounterModule } from './modules/counter/counter.module';
import { ContributionModule } from './modules/contribution/contribution.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HeroService } from './modules/hero/hero.service';
import { NewsService } from './modules/news/news.service';
import { PartnersService } from './modules/partners/partners.service';
import { FeedbackService } from './modules/feedback/feedback.service';
import { TeamService } from './modules/team/team.service';
import { CounterService } from './modules/counter/counter.service';
import { ContributionService } from './modules/contribution/contribution.service';
import { MapModule } from './modules/maps/maps.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: String(process.env.DB_PASSWORD || 1230),
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HeroModule,
    NewsModule,
    PartnersModule,
    FeedbackModule,
    TeamModule,
    CounterModule,
    ContributionModule,
    MapModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.ALL },
        { path: '/auth/*', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}

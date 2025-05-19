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
import { MapModule } from './modules/maps/maps.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TelegramModule } from './modules/telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: String(process.env.DB_PASSWORD || '1230'),
      database: process.env.DB_NAME || 'batareykalar_uz',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
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
    TelegramModule,
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
        { path: '/telegram', method: RequestMethod.ALL },
        { path: '/auth/*', method: RequestMethod.ALL },
        { path: '/hero', method: RequestMethod.GET },
        { path: '/map', method: RequestMethod.GET },
        { path: '/contribution/*', method: RequestMethod.GET },
        { path: '/counter', method: RequestMethod.GET },
        { path: '/feedback', method: RequestMethod.GET },
        { path: '/news/*', method: RequestMethod.GET },
        { path: '/team/*', method: RequestMethod.GET },
        { path: '/partners/*', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}

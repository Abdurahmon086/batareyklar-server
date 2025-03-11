import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}

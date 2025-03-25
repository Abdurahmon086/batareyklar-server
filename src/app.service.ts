import { Injectable } from '@nestjs/common';
import { HeroService } from './modules/hero/hero.service';
import { MapService } from './modules/maps/maps.service';
import { NewsService } from './modules/news/news.service';
import { CounterService } from './modules/counter/counter.service';
import { TeamService } from './modules/team/team.service';
import { ContributionService } from './modules/contribution/contribution.service';
import { FeedbackService } from './modules/feedback/feedback.service';
import { PartnersService } from './modules/partners/partners.service';
import { IResponseInfo } from './types';

@Injectable()
export class AppService {
  constructor(
    private heroService: HeroService,
    private mapService: MapService,
    private newsService: NewsService,
    private counterService: CounterService,
    private partnersService: PartnersService,
    private contributionService: ContributionService,
    private feedbackService: FeedbackService,
    private teamService: TeamService,
  ) {}

  async getHemo(): Promise<IResponseInfo<Object>> {
    try {
      const hero = await this.heroService.getAll();
      const map = await this.mapService.getAll();
      const news = await this.newsService.getAll();
      const counter = await this.counterService.getAll();
      const partners = await this.partnersService.getAll();
      const contribution = await this.contributionService.getAll();
      const feedback = await this.feedbackService.getAll();
      const team = await this.teamService.getAll();

      const data = {
        hero: hero.data ?? null,
        map: map.data ?? null,
        news: news.data ?? null,
        counter: counter.data ?? null,
        partners: partners.data ?? null,
        contribution: contribution.data ?? null,
        feedback: feedback.data ?? null,
        team: team.data ?? null,
      };

      return { status: 200, data, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }
}

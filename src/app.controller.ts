import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponseInfo } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(): Promise<IResponseInfo<Object>> {
    return this.appService.getHemo();
  }
}

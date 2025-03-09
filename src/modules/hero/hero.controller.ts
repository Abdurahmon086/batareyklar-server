import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './hero.entity';
import { IResponseInfo } from 'src/types';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Hero[]>> {
    return this.heroService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Hero>> {
    return this.heroService.getOne(Number(id));
  }

  @Post()
  async create(@Body() userData: Partial<Hero>): Promise<IResponseInfo<Hero>> {
    return this.heroService.create(userData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Hero>,
  ): Promise<IResponseInfo<Hero>> {
    return this.heroService.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.heroService.remove(Number(id));
  }
}

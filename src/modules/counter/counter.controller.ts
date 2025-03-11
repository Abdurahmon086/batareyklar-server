import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { IResponseInfo } from 'src/types';
import { CounterService } from './counter.service';
import { Counter } from './counter.entity';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Counter[]>> {
    return this.counterService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Counter>> {
    return this.counterService.getOne(Number(id));
  }

  @Post()
  async create(
    @Body() counterData: Partial<Counter>,
  ): Promise<IResponseInfo<Counter>> {
    return this.counterService.create(counterData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Counter>,
  ): Promise<IResponseInfo<Counter>> {
    return this.counterService.update(Number(id), userData);
  }
}

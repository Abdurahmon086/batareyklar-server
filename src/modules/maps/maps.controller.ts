import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { IResponseInfo } from 'src/types';
import { MapService } from './maps.service';
import { Map } from './maps.entity';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Map[]>> {
    return this.mapService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Map>> {
    return this.mapService.getOne(Number(id));
  }

  @Post()
  async create(@Body() mapData: Partial<Map>): Promise<IResponseInfo<Map>> {
    return this.mapService.create(mapData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Map>,
  ): Promise<IResponseInfo<Map>> {
    return this.mapService.update(Number(id), userData);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { Map } from './maps.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
  ) {}

  async getAll(): Promise<IResponseInfo<Map[]>> {
    try {
      const map = await this.mapRepository.find();
      return { status: 200, data: map, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Map>> {
    try {
      const map = await this.mapRepository.findOneBy({ id });
      if (!map) throw new NotFoundException(`map with id: ${id} not found`);
      return { status: 200, data: map, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(mapData: Partial<Map>): Promise<IResponseInfo<Map>> {
    try {
      const map = await this.mapRepository.save(
        this.mapRepository.create(mapData),
      );
      return { status: 201, data: map, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(id: number, data: Partial<Map>): Promise<IResponseInfo<Map>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Map>;

      const updated = await this.mapRepository.save({
        ...result.data,
        ...data,
      });
      return { status: 200, data: updated, message: 'Updated' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }
}

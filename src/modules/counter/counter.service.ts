import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { Counter } from './counter.entity';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepository: Repository<Counter>,
  ) {}

  async getAll(): Promise<IResponseInfo<Counter[]>> {
    try {
      const counters = await this.counterRepository.find({
        order: { createdAt: 'ASC' },
      });
      return { status: 200, data: counters, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Counter>> {
    try {
      const Counter = await this.counterRepository.findOneBy({ id });
      if (!Counter)
        throw new NotFoundException(`Counter with id: ${id} not found`);
      return { status: 200, data: Counter, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(CounterData: Partial<Counter>): Promise<IResponseInfo<Counter>> {
    try {
      const Counter = await this.counterRepository.save(
        this.counterRepository.create(CounterData),
      );
      return { status: 201, data: Counter, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(
    id: number,
    data: Partial<Counter>,
  ): Promise<IResponseInfo<Counter>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Counter>;

      const updated = await this.counterRepository.save({
        ...result.data,
        ...data,
      });
      return { status: 200, data: updated, message: 'Updated' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }
}

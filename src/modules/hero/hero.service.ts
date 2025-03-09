import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.entity';
import { IResponseInfo } from 'src/types';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  async getAll(): Promise<IResponseInfo<Hero[]>> {
    try {
      const heroes = await this.heroRepository.find();
      return { status: 200, data: heroes, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Hero>> {
    try {
      const hero = await this.heroRepository.findOneBy({ id });
      if (!hero) throw new NotFoundException(`Hero with id: ${id} not found`);
      return { status: 200, data: hero, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(heroData: Partial<Hero>): Promise<IResponseInfo<Hero>> {
    try {
      const hero = await this.heroRepository.save(
        this.heroRepository.create(heroData),
      );
      return { status: 201, data: hero, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(id: number, data: Partial<Hero>): Promise<IResponseInfo<Hero>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Hero>;

      const updated = await this.heroRepository.save({
        ...result.data,
        ...data,
      });
      return { status: 200, data: updated, message: 'Updated' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async remove(id: number): Promise<IResponseInfo<boolean>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) {
        return { status: result.status, data: false, message: result.message };
      }

      if (result.data) {
        await this.heroRepository.remove(result.data);
      }
      return { status: 200, data: true, message: 'Deleted' };
    } catch (error) {
      return { status: 500, data: false, message: error.message };
    }
  }
}

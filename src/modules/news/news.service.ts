import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { News } from './news.entity';
import { deleteImage } from 'src/utils/upload-image';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getAll(): Promise<IResponseInfo<News[]>> {
    try {
      const news = await this.newsRepository.find();
      return { status: 200, data: news, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<News>> {
    try {
      const news = await this.newsRepository.findOneBy({ id });
      if (!news) throw new NotFoundException(`News with id: ${id} not found`);
      return { status: 200, data: news, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(newsData: Partial<News>): Promise<IResponseInfo<News>> {
    try {
      const news = await this.newsRepository.save(
        this.newsRepository.create(newsData),
      );
      return { status: 201, data: news, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(id: number, data: Partial<News>): Promise<IResponseInfo<News>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<News>;

      const updated = await this.newsRepository.save({
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
        deleteImage(`/news/${result.data.image}`);
        await this.newsRepository.remove(result.data);
      }
      return { status: 200, data: true, message: 'Deleted' };
    } catch (error) {
      return { status: 500, data: false, message: error.message };
    }
  }
}

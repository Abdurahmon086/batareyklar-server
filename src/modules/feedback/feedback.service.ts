import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { deleteImage } from 'src/utils/upload-image';
import { Feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async getAll(): Promise<IResponseInfo<Feedback[]>> {
    try {
      const feedback = await this.feedbackRepository.find();
      return { status: 200, data: feedback, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Feedback>> {
    try {
      const feedback = await this.feedbackRepository.findOneBy({ id });
      if (!feedback)
        throw new NotFoundException(`feedback with id: ${id} not found`);
      return { status: 200, data: feedback, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(
    feedbackData: Partial<Feedback>,
  ): Promise<IResponseInfo<Feedback>> {
    try {
      const feedback = await this.feedbackRepository.save(
        this.feedbackRepository.create(feedbackData),
      );
      return { status: 201, data: feedback, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(
    id: number,
    data: Partial<Feedback>,
  ): Promise<IResponseInfo<Feedback>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Feedback>;

      const updated = await this.feedbackRepository.save({
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
        deleteImage(`/feedback/${result.data.image}`);
        await this.feedbackRepository.remove(result.data);
      }
      return { status: 200, data: true, message: 'Deleted' };
    } catch (error) {
      return { status: 500, data: false, message: error.message };
    }
  }
}

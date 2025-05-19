import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { Contribution } from './contribution.entity';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
  ) {}

  async getAll(): Promise<IResponseInfo<Contribution[]>> {
    try {
      const contribution = await this.contributionRepository.find({
        order: { createdAt: 'ASC' },
      });
      return { status: 200, data: contribution, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Contribution>> {
    try {
      const contribution = await this.contributionRepository.findOneBy({ id });
      if (!contribution)
        throw new NotFoundException(`contribution with id: ${id} not found`);
      return { status: 200, data: contribution, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(
    contributionData: Partial<Contribution>,
  ): Promise<IResponseInfo<Contribution>> {
    try {
      const contribution = await this.contributionRepository.save(
        this.contributionRepository.create(contributionData),
      );
      return { status: 201, data: contribution, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(
    id: number,
    data: Partial<Contribution>,
  ): Promise<IResponseInfo<Contribution>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Contribution>;

      const updated = await this.contributionRepository.save({
        ...result.data,
        ...data,
      });
      return { status: 200, data: updated, message: 'Updated' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }
}

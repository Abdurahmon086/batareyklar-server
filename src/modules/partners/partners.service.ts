import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { deleteImage } from 'src/utils/upload-image';
import { Partners } from './partners.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partners)
    private readonly partnersRepository: Repository<Partners>,
  ) {}

  async getAll(): Promise<IResponseInfo<Partners[]>> {
    try {
      const partners = await this.partnersRepository.find();
      return { status: 200, data: partners, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Partners>> {
    try {
      const partners = await this.partnersRepository.findOneBy({ id });
      if (!partners) throw new NotFoundException(`partners with id: ${id} not found`);
      return { status: 200, data: partners, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(partnersData: Partial<Partners>): Promise<IResponseInfo<Partners>> {
    try {
      const partners = await this.partnersRepository.save(
        this.partnersRepository.create(partnersData),
      );
      return { status: 201, data: partners, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(id: number, data: Partial<Partners>): Promise<IResponseInfo<Partners>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Partners>;

      const updated = await this.partnersRepository.save({
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
        deleteImage(`/partners/${result.data.image}`);
        await this.partnersRepository.remove(result.data);
      }
      return { status: 200, data: true, message: 'Deleted' };
    } catch (error) {
      return { status: 500, data: false, message: error.message };
    }
  }
}

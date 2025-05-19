import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponseInfo } from 'src/types';
import { deleteImage } from 'src/utils/upload-image';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async getAll(): Promise<IResponseInfo<Team[]>> {
    try {
      const team = await this.teamRepository.find({
        order: { createdAt: 'ASC' },
      });
      return { status: 200, data: team, message: 'Success' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async getOne(id: number): Promise<IResponseInfo<Team>> {
    try {
      const team = await this.teamRepository.findOneBy({ id });
      if (!team) throw new NotFoundException(`team with id: ${id} not found`);
      return { status: 200, data: team, message: 'Success' };
    } catch (error) {
      const status = error instanceof NotFoundException ? 404 : 500;
      return { status, data: null, message: error.message };
    }
  }

  async create(teamData: Partial<Team>): Promise<IResponseInfo<Team>> {
    try {
      const team = await this.teamRepository.save(
        this.teamRepository.create({
          ...teamData,
          isActive:
            typeof teamData.isActive === 'string'
              ? teamData.isActive === 'true'
              : teamData.isActive,
        }),
      );
      return { status: 201, data: team, message: 'Created' };
    } catch (error) {
      return { status: 500, data: null, message: error.message };
    }
  }

  async update(id: number, data: Partial<Team>): Promise<IResponseInfo<Team>> {
    try {
      const result = await this.getOne(id);
      if (result.status !== 200) return result as IResponseInfo<Team>;

      if (data.image && result.data?.image) {
        deleteImage(`/team/${result.data.image}`);
      }

      const updated = await this.teamRepository.save({
        ...result.data,
        ...data,
        isActive:
          typeof data.isActive === 'string'
            ? data.isActive === 'true'
            : data.isActive,
        image: data.image || result.data?.image,
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
        deleteImage(`/team/${result.data.image}`);
        await this.teamRepository.remove(result.data);
      }
      return { status: 200, data: true, message: 'Deleted' };
    } catch (error) {
      return { status: 500, data: false, message: error.message };
    }
  }
}

import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { IResponseInfo } from 'src/types';
import { ContributionService } from './contribution.service';
import { Contribution } from './contribution.entity';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Contribution[]>> {
    return this.contributionService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Contribution>> {
    return this.contributionService.getOne(Number(id));
  }

  @Post()
  async create(
    @Body() contributionData: Partial<Contribution>,
  ): Promise<IResponseInfo<Contribution>> {
    return this.contributionService.create(contributionData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Contribution>,
  ): Promise<IResponseInfo<Contribution>> {
    return this.contributionService.update(Number(id), userData);
  }
}

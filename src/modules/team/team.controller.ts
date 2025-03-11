import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { IResponseInfo } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from 'src/utils/upload-image';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Team[]>> {
    return this.teamService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Team>> {
    return this.teamService.getOne(Number(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/team',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async create(
    @Body() teamData: Partial<Team>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<Team>> {
    return this.teamService.create({
      ...teamData,
      image: file.filename,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Team>,
  ): Promise<IResponseInfo<Team>> {
    return this.teamService.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.teamService.remove(Number(id));
  }
}

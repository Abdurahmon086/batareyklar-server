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
  Res,
} from '@nestjs/common';
import { IResponseInfo } from 'src/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/upload-image';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { existsSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

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

  @Get('images/:imageName')
  async seeUploadedFile(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const filePath = join(__dirname, '..', 'uploads', 'team', imageName);

    if (!existsSync(filePath)) {
      return res.status(404).send('Fayl topilmadi');
    }

    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
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
  @UseInterceptors(FileInterceptor('image', storage))
  async update(
    @Param('id') id: string,
    @Body() teamData: Partial<Team>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IResponseInfo<Team>> {
    return this.teamService.update(Number(id), {
      ...teamData,
      image: file?.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.teamService.remove(Number(id));
  }
}

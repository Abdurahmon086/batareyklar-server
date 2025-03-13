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
import { Response } from 'express';
import { IResponseInfo } from 'src/types';
import { NewsService } from './news.service';
import { News } from './news.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/upload-image';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('news')
export class NewsController {
  constructor(private readonly newService: NewsService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<News[]>> {
    return this.newService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<News>> {
    return this.newService.getOne(Number(id));
  }

  @Get('images/:imageName')
  async seeUploadedFile(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const filePath = join(__dirname, '..', 'uploads', 'news', imageName);

    if (!existsSync(filePath)) {
      return res.status(404).send('Fayl topilmadi');
    }

    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Body() newsData: Partial<News>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<News>> {
    return this.newService.create({ ...newsData, image: file.filename });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', storage))
  async update(
    @Param('id') id: string,
    @Body() newsData: Partial<News>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IResponseInfo<News>> {
    return this.newService.update(Number(id), {
      ...newsData,
      image: file?.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.newService.remove(Number(id));
  }
}

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
import { NewsService } from './news.service';
import { News } from './news.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from 'src/utils/upload-image';

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

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/news',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async create(
    @Body() newsData: Partial<News>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<News>> {
    return this.newService.create({ ...newsData, image: file.filename });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/news',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() newsData: Partial<News>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<News>> {
    return this.newService.update(Number(id), {
      ...newsData,
      image: file.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.newService.remove(Number(id));
  }
}

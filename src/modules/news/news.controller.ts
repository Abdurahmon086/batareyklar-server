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
    @Body() userData: Partial<News>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<News>> {
    return this.newService.create({ ...userData, image: file.filename });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<News>,
  ): Promise<IResponseInfo<News>> {
    return this.newService.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.newService.remove(Number(id));
  }
}

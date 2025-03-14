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
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Feedback[]>> {
    return this.feedbackService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Feedback>> {
    return this.feedbackService.getOne(Number(id));
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
    @Body() feedbackData: Partial<Feedback>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<Feedback>> {
    return this.feedbackService.create({
      ...feedbackData,
      image: file.filename,
    });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', storage))
  async update(
    @Param('id') id: string,
    @Body() feedbackData: Partial<Feedback>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IResponseInfo<Feedback>> {
    return this.feedbackService.update(Number(id), {
      ...feedbackData,
      image: file?.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.feedbackService.remove(Number(id));
  }
}

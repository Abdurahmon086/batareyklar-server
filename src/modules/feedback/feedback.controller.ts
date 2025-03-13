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
import { storage } from 'src/utils/upload-image';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

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
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Feedback>,
  ): Promise<IResponseInfo<Feedback>> {
    return this.feedbackService.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.feedbackService.remove(Number(id));
  }
}

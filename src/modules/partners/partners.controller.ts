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
import { PartnersService } from './partners.service';
import { Partners } from './partners.entity';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnerservice: PartnersService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Partners[]>> {
    return this.partnerservice.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Partners>> {
    return this.partnerservice.getOne(Number(id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Body() partnersData: Partial<Partners>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<Partners>> {
    return this.partnerservice.create({
      ...partnersData,
      image: file.filename,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Partners>,
  ): Promise<IResponseInfo<Partners>> {
    return this.partnerservice.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.partnerservice.remove(Number(id));
  }
}

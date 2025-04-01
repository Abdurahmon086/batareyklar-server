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
import { PartnersService } from './partners.service';
import { Partners } from './partners.entity';
import { join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';

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

  @Get('images/:imageName')
  async seeUploadedFile(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const filePath = join(__dirname, '..', 'uploads', 'partners', imageName);

    if (!existsSync(filePath)) {
      return res.status(404).send('Fayl topilmadi');
    }

    res.sendFile(filePath);
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
  @UseInterceptors(FileInterceptor('image', storage))
  async update(
    @Param('id') id: string,
    @Body() partnersData: Partial<Partners>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IResponseInfo<Partners>> {
    return this.partnerservice.update(Number(id), {
      ...partnersData,
      image: file?.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.partnerservice.remove(Number(id));
  }
}

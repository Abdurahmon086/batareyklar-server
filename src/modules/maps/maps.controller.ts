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
import { PartnersService } from './maps.service';
import { Partners } from './maps.entity';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnerService: PartnersService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<Partners[]>> {
    return this.partnerService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<Partners>> {
    return this.partnerService.getOne(Number(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/partners',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async create(
    @Body() partnersData: Partial<Partners>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<Partners>> {
    return this.partnerService.create({
      ...partnersData,
      image: file.filename,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<Partners>,
  ): Promise<IResponseInfo<Partners>> {
    return this.partnerService.update(Number(id), userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.partnerService.remove(Number(id));
  }
}

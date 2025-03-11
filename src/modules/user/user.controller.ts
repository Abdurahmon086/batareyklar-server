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
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from 'src/utils/upload-image';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<IResponseInfo<User[]>> {
    return this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponseInfo<User>> {
    return this.userService.getOne(Number(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/user',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async create(
    @Body() userData: Partial<User>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<User>> {
    return this.userService.create({ ...userData, image: file.filename });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads/user',
      fileFilter: fileFilter,
      storage: storage,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IResponseInfo<User>> {
    return this.userService.update(Number(id), {
      ...userData,
      image: file.filename,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponseInfo<boolean>> {
    return this.userService.remove(Number(id));
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersService } from './maps.service';
import { PartnersController } from './maps.controller';
import { Partners } from './maps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partners])],
  providers: [PartnersService],
  controllers: [PartnersController],
})
export class PartnersModule {}

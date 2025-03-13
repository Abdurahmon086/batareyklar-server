import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapService } from './maps.service';
import { MapController } from './maps.controller';
import { Map } from './maps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService],
})
export class MapModule {}

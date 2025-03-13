import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { Counter } from './counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  providers: [CounterService],
  controllers: [CounterController],
  exports: [CounterService],
})
export class CounterModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './hero.entity';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  providers: [HeroService],
  controllers: [HeroController],
})
export class HeroModule {}

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS sozlamalari
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Static fayllar uchun papkalar
  const staticConfig = [
    { path: '/news', dir: 'news' },
    { path: '/feedback', dir: 'feedback' },
    { path: '/partners', dir: 'partners' },
    { path: '/team', dir: 'team' },
    { path: '/user', dir: 'user' },
  ];

  staticConfig.forEach((config) => {
    const dirPath = join(__dirname, '..', 'uploads', config.dir);
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    app.useStaticAssets(dirPath, {
      prefix: config.path,
    });
  });

  await app.listen(process.env.PORT || 3300);
}
bootstrap();

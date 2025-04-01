import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('send-message')
  async sendMessage(@Body() { message }: { message: string }) {
    await this.telegramService.sendMessage(message);
    return { status: 'Message sent!' };
  }
}

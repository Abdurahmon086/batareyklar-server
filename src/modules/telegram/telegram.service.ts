import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = '7548952603:AAEgGQ3S7XhlfcgB4gRgE71WOzaMujT2d80';
    this.chatId = '-1002695465023';
  }

  async sendMessage(message: string): Promise<any> {
    if (!this.botToken || !this.chatId) {
      throw new Error('Telegram token yoki chat ID sozlanmagan.');
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: this.chatId,
        text: message,
      });

      return response.data;
    } catch (error) {
      console.error(
        'Telegramga xabar yuborishda xatolik:',
        error.response?.data || error.message,
      );
      throw new Error('Xabar yuborishda muammo yuzaga keldi.');
    }
  }
}

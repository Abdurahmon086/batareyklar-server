import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = '8011848756:AAFdGbBFtRE57gQPgYPD-GmzocIQVazIeII';
    this.chatId = '2593736892';
  }

  async sendMessage(message: string): Promise<any> {
    if (!this.botToken || !this.chatId) {
      throw new Error('Telegram token yoki chat ID sozlanmagan.');
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    console.log(`🔹 Telegramga so‘rov yuborilyapti: ${url}`);
    
    try {
      const response = await axios.post(url, {
        chat_id: this.chatId,
        text: message,
      });

      console.log('✅ Telegram javobi:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Telegramga xabar yuborishda xatolik:', error.response?.data || error.message);
      throw new Error('Xabar yuborishda muammo yuzaga keldi.');
    }
  }
}

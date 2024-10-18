import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf('7392655095:AAFsQYg7UtjuYrRUmVPir2enRIxZyJA8UBM');
    this.initializeBot();
  }

  private initializeBot() {
    this.bot.start((ctx) =>
      ctx.reply('Welcome!', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open menu',
                web_app: {
                  url: 'https://hack-front-ai82.vercel.app/?vercelToolbarCode=3szX98Gz7HVAAxG',
                },
              },
            ],
          ],
        },
      }),
    );

    this.bot
      .launch()
      .catch((err) => console.error('Failed to launch bot', err));
  }

  async sendMessageByUserId(userId: string, message: string) {
    await this.bot.telegram.sendMessage(userId, message);
  }
}

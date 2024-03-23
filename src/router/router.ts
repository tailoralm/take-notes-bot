import {Context, Telegraf} from 'telegraf';
import PhotoMessageRouter from '../modules/photo/photo-message.router';
import VideoMessageRouter from '../modules/video/video-message.router';
import VoiceMessageRouter from '../modules/voice/voice-message.router';
import DocumentMessageController from '../modules/document/document-message.controller';
import TextMessageRouter from '../modules/text/text-message.router';

export default class Router {
  static init(bot: Telegraf) {
    PhotoMessageRouter.router(bot);
    VideoMessageRouter.router(bot);
    VoiceMessageRouter.router(bot);
    DocumentMessageController.router(bot);
    TextMessageRouter.router(bot);

    this.commands(bot);
  }

  static commands(bot: Telegraf) {
    bot.command('help', (ctx: Context) => {
      ctx.reply(
        'To save something add the command in the caption or reply the file with the command.'
      );
    });

    bot.command('start', (ctx: Context) => {
      const first_name = ctx.from?.first_name;
      ctx.reply(`Hello, ${first_name}! Welcome to the bot.`);
    });
  }
}

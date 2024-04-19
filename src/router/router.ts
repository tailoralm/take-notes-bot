import {Context, Telegraf} from 'telegraf';
import PhotoRouter from '../modules/photo/router';
import DocumentRouter from '../modules/document/router';
import TextRouter from '../modules/text/router';
import VideoRouter from '../modules/video/router';
import VoiceRouter from '../modules/voice/router';

export default class Router {
  static init(bot: Telegraf) {
    DocumentRouter.router(bot);
    PhotoRouter.router(bot);
    TextRouter.router(bot);
    VideoRouter.router(bot);
    VoiceRouter.router(bot);

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

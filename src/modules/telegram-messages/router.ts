import { Context, Telegraf } from 'telegraf';
import PhotoRouter from './photo/router';
import DocumentRouter from './document/router';
import TextRouter from './text/router';
import VideoRouter from './video/router';
import VoiceRouter from './voice/router';

export default class Router {
  constructor() {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
    bot.use(this.checkAuthorization);

    DocumentRouter.router(bot);
    PhotoRouter.router(bot);
    VideoRouter.router(bot);
    VoiceRouter.router(bot);
    TextRouter.router(bot); // 'Message' should be the last one to initialize

    this.commands(bot);
    bot.launch();
  }

  commands(bot: Telegraf) {
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

  checkAuthorization(ctx: Context, next: () => any) {
    if (!process.env.MY_TELEGRAM_ID) ctx.reply(`Your chat ID: ${ctx.from?.id}`);
    if (ctx.from?.id !== Number(process.env.MY_TELEGRAM_ID)) {
      return ctx.reply('Not Authorized');
    }
    return next();
  }
}

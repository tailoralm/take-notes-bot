import { Context, Telegraf } from 'telegraf';
import DocumentController from './document.controller';

export default class DocumentRouter {
  static router(bot: Telegraf) {
    bot.on('document', (ctx: Context) => {
      new DocumentController(ctx).save();
    });
  }

  static fromReply(ctx: Context) {
    new DocumentController(ctx).save(true);
  }
}

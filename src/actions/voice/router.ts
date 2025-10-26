import { Telegraf } from 'telegraf';
import VoiceController from './voice.controller';

export default class VoiceRouter {
  static router(bot: Telegraf) {
    bot.on('voice', async ctx => {
      new VoiceController(ctx).save();
    });
  }

  static fromReply(ctx: any) {
    new VoiceController(ctx).save(true);
  }
}

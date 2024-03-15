import 'dotenv/config';
import {Telegraf, Context} from 'telegraf';
import PhotoMessageController from './router/photo-message.controller';
import VoiceMessageController from './router/voice-message.controller';
import TextMessageController from './router/text-message.controller';
import CommandMessageController from './router/command-message.controller';
import DocumentMessageController from './router/document-message.controller';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
bot.use(checkAuthorization);

CommandMessageController.router(bot);
PhotoMessageController.router(bot);
VoiceMessageController.router(bot);
DocumentMessageController.router(bot);
TextMessageController.router(bot);

bot.launch();

function checkAuthorization(ctx: Context, next: () => any) {
  if (!process.env.MY_TELEGRAM_ID) ctx.reply(`Your chat ID: ${ctx.from?.id}`);
  if (ctx.from?.id !== Number(process.env.MY_TELEGRAM_ID)) {
    return ctx.reply('Not Authorized');
  }
  return next();
}

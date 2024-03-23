import 'dotenv/config';
import {Telegraf, Context} from 'telegraf';
import Router from './router/router';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
bot.use(checkAuthorization);

Router.init(bot);

bot.launch();

function checkAuthorization(ctx: Context, next: () => any) {
  if (!process.env.MY_TELEGRAM_ID) ctx.reply(`Your chat ID: ${ctx.from?.id}`);
  if (ctx.from?.id !== Number(process.env.MY_TELEGRAM_ID)) {
    return ctx.reply('Not Authorized');
  }
  return next();
}

import 'dotenv/config';
import {Telegraf, Context} from 'telegraf';
import PhotoMessageController from "./router/photo-message.controller";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
bot.use(checkAuthorization);

PhotoMessageController.router(bot);

bot.command('start', (ctx: Context) => {
  const first_name = ctx.from?.first_name;
  ctx.reply(`Hello, ${first_name}! Welcome to the bot.`);
})

bot.launch();

function checkAuthorization(ctx: Context, next: () => any) {
  if (ctx.from?.id !== Number(process.env.MY_TELEGRAM_ID)) {
    return ctx.reply('Not Authorized');
  }
  return next();
}

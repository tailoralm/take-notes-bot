import 'dotenv/config';
import {Telegraf, Context} from 'telegraf';
import Router from './router/router';
import {ensureDirectoryExistence} from './utils/general-utils';
import {EFolders} from './shared/folders.enum';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);
bot.use(checkAuthorization);

// Create all folders
Object.values(EFolders).forEach((folder: string) =>
  ensureDirectoryExistence(folder + '/any.jpg')
);

Router.init(bot);

bot.launch();

function checkAuthorization(ctx: Context, next: () => any) {
  if (!process.env.MY_TELEGRAM_ID) ctx.reply(`Your chat ID: ${ctx.from?.id}`);
  if (ctx.from?.id !== Number(process.env.MY_TELEGRAM_ID)) {
    return ctx.reply('Not Authorized');
  }
  return next();
}

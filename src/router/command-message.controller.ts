import {Context, Telegraf} from "telegraf";

export default class CommandMessageController {
  static router(bot: Telegraf) {
    bot.command('help', (ctx: Context) => {
      ctx.reply("To save something add the command in the caption or reply the file with the command. \n\nCommands:\nSave file: <name>\nSave receipt: -r <name>");
    });
  }
}

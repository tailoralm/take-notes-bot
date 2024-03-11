import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SaveReceiptsController from "../modules/save-receipts/save-receipts.controller";

export default class PhotoMessageController {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;
      if(!message.photo)
        return ctx.reply('Please attatch a photo!');

      if(message.caption?.startsWith('/receipt')) SaveReceiptsController.saveThisPhoto(ctx);
      return;
    });

  }
}

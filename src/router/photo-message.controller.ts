import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SaveReceiptsController from "../modules/save-receipts/save-receipts.controller";

export default class PhotoMessageController {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;
      if(!message.photo)
        return ctx.reply('Please attatch a photo!');

      if(message.caption?.startsWith('-r'))
        SaveReceiptsController.saveReceipt(ctx);

      return;
    });
  }

  public static replyPhoto(ctx: Context){
    const message = ctx.message as Message.TextMessage;

    if(message.text?.startsWith('-r'))
      SaveReceiptsController.saveReplyedReceipt(ctx);
  }
}

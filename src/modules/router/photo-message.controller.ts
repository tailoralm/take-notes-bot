import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SaveReceiptsController from "../save-receipts/save-receipts.controller";

export default class PhotoMessageController {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;
      switch (message.caption){
        case '/receipt':
          SaveReceiptsController.save(ctx);
          break;
      }
    });

  }
}

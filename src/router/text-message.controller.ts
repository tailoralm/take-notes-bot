import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import PhotoMessageController from "./photo-message.controller";

export default class TextMessageController {
  static router(bot: Telegraf) {
    bot.on('message', (ctx: Context) => {
      const message = ctx.message as Message.TextMessage;

      if(message.reply_to_message) {
        if((<Message.PhotoMessage>message.reply_to_message).photo) PhotoMessageController.replyPhoto(ctx);
        // Verify another replies
      }
      return;
    });
  }
}

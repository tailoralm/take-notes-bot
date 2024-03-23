import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import PhotoMessageController from "./photo-message.controller";
import VoiceMessageController from "./voice-message.controller";
import DocumentMessageController from "./document-message.controller";
import VideoMessageController from "./video-message.controller";
import SaveTextController from "../modules/save-files/save-text.controller";

export default class TextMessageController {
  static router(bot: Telegraf) {
    bot.on('message', (ctx: Context) => {
      const message = ctx.message as Message.TextMessage;

      if(message.reply_to_message) {
        if((<Message.PhotoMessage>message.reply_to_message).photo) PhotoMessageController.replyPhoto(ctx);
        if((<Message.VideoMessage>message.reply_to_message).video) VideoMessageController.replyVideo(ctx);
        if((<Message.VoiceMessage>message.reply_to_message).voice) VoiceMessageController.replyVoice(ctx);
        if((<Message.DocumentMessage>message.reply_to_message).document) DocumentMessageController.replyDoc(ctx);
      }

      if(message.text) {
        new SaveTextController(ctx).logMessage();
      }



      return;
    });
  }
}

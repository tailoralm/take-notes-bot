import { Context, Telegraf } from 'telegraf';
import { Message } from 'typegram';
import DocumentRouter from '../document/router';
import PhotoRouter from '../photo/router';
import VideoRouter from '../video/router';
import VoiceRouter from '../voice/router';
import SaveTextController from './text.controller';

export default class TextRouter {
  static router(bot: Telegraf) {
    bot.on('message', (ctx: Context) => {
      const message = ctx.message as Message.TextMessage;

      if (message.reply_to_message) {
        if ((<Message.PhotoMessage>message.reply_to_message).photo) PhotoRouter.replyPhoto(ctx);
        if ((<Message.VideoMessage>message.reply_to_message).video) VideoRouter.replyVideo(ctx);
        if ((<Message.VoiceMessage>message.reply_to_message).voice) VoiceRouter.fromReply(ctx);
        if ((<Message.DocumentMessage>message.reply_to_message).document) DocumentRouter.fromReply(ctx);
      }

      if (message.text) {
        new SaveTextController(ctx).logMessage();
      }

      return;
    });
  }
}

import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import PhotoMessageRouter from '../photo/photo-message.router';
import VoiceMessageRouter from '../voice/voice-message.router';
import DocumentMessageController from '../document/document-message.controller';
import VideoMessageRouter from '../video/video-message.router';
import SaveTextController from './save-text.controller';

export default class TextMessageRouter {
  static router(bot: Telegraf) {
    bot.on('message', (ctx: Context) => {
      const message = ctx.message as Message.TextMessage;

      if (message.reply_to_message) {
        if ((<Message.PhotoMessage>message.reply_to_message).photo)
          PhotoMessageRouter.replyPhoto(ctx);
        if ((<Message.VideoMessage>message.reply_to_message).video)
          VideoMessageRouter.replyVideo(ctx);
        if ((<Message.VoiceMessage>message.reply_to_message).voice)
          VoiceMessageRouter.replyVoice(ctx);
        if ((<Message.DocumentMessage>message.reply_to_message).document)
          DocumentMessageController.replyDoc(ctx);
      }

      if (message.text) {
        new SaveTextController(ctx).logMessage();
      }

      return;
    });
  }
}

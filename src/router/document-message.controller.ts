import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import SaveDocumentController from '../modules/save-files/save-document.controller';

export default class DocumentMessageController {
  static router(bot: Telegraf) {
    bot.on('document', (ctx: Context) => {
      const message = ctx.message as Message.DocumentMessage;

      if (!message.document) return ctx.reply('Please attatch a document!');

      if (message.caption?.startsWith('-r'))
        return new SaveDocumentController(ctx, 'receipts').saveDoc();

      return new SaveDocumentController(ctx).saveDoc();
    });
  }

  public static replyDoc(ctx: Context) {
    const message = ctx.message as Message.TextMessage;

    if (message.text?.startsWith('-s'))
      return new SaveDocumentController(ctx).saveRepliedDoc();

    if (message.text?.startsWith('-r'))
      return new SaveDocumentController(ctx, 'receipts').saveRepliedDoc();
  }
}

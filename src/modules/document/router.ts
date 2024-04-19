import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import SaveDocumentController from './save-document.controller';
import {EFolders} from '../../shared/enums/folders.enum';
import * as CommandsUtils from '../../utils/commands-utils';

export default class DocumentRouter {
  static router(bot: Telegraf) {
    bot.on('document', (ctx: Context) => {
      const message = ctx.message as Message.DocumentMessage;

      const commands = CommandsUtils.parseCommands(message.caption);
      if (commands.receipt)
        return new SaveDocumentController(ctx, EFolders.receipts).saveDoc();

      return new SaveDocumentController(ctx).saveDoc();
    });
  }

  public static replyDoc(ctx: Context) {
    const message = ctx.message as Message.TextMessage;

    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new SaveDocumentController(ctx).saveRepliedDoc();

    if (commands.receipt)
      return new SaveDocumentController(
        ctx,
        EFolders.receipts
      ).saveRepliedDoc();
  }
}

import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import DocumentController from './document.controller';
import {EFolders} from '../../../shared/enums/folders.enum';
import * as CommandsUtils from '../../../utils/commands-utils';

export default class DocumentRouter {
  static router(bot: Telegraf) {
    bot.on('document', (ctx: Context) => {
      const message = ctx.message as Message.DocumentMessage;

      const commands = CommandsUtils.parseCommands(message.caption);
      if (commands.receipt)
        return new DocumentController(ctx, EFolders.receipts).saveDoc();

      return new DocumentController(ctx).saveDoc();
    });
  }

  public static replyDoc(ctx: Context) {
    const message = ctx.message as Message.TextMessage;

    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new DocumentController(ctx).saveRepliedDoc();

    if (commands.receipt)
      return new DocumentController(ctx, EFolders.receipts).saveRepliedDoc();
  }
}

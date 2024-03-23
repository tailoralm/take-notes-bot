import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SaveDocumentController from "../modules/save-files/save-document.controller";
import {EFolders} from "../shared/folders.enum";
import * as CommandsUtils from "../utils/commands-utils";

export default class DocumentMessageController {
  static router(bot: Telegraf) {
    bot.on('document', (ctx: Context) => {
      const message = ctx.message as Message.DocumentMessage;

      if(!message.caption) return new SaveDocumentController(ctx).saveDoc();

      const commands = CommandsUtils.parseCommands(message.caption);

      if(commands.receipt)
        return new SaveDocumentController(ctx, EFolders.receipts).saveDoc();

    });
  }

  public static replyDoc(ctx: Context){
    const message = ctx.message as Message.TextMessage;

    const commands = CommandsUtils.parseCommands(message.text);

    if(commands.save)
      return new SaveDocumentController(ctx).saveRepliedDoc();

    if(commands.receipt)
      return new SaveDocumentController(ctx, EFolders.receipts).saveRepliedDoc();
  }
}

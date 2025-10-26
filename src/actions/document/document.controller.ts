import { Context } from 'telegraf';
import { Message } from 'typegram';
import * as CommandsUtils from '../../utils/commands-utils';
import { EFolders } from '../folders.enum';
import SaveFilesAbstractController from '../save-files.abstract.controller';

// V2.0 - Update all other features to follow this pattern
export default class DocumentController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.docs) {
    super(ctx, folder);
  }

  save(isReply = false) {
    let textMessage: string;
    let document: string;
    let filename: string;
    if (isReply) {
      const message = this.ctx.message as Message.TextMessage;
      textMessage = message.text;
      const messageReplied = message.reply_to_message as Message.DocumentMessage;
      document = messageReplied.document.file_id;
      const splitCaption = message.text.split(' ') as string[];
      filename = this.getFilename(splitCaption.length > 1 ? splitCaption[1] : 'doc', messageReplied.document.file_name!);
    } else {
      const message = this.ctx.message as Message.DocumentMessage;
      textMessage = message.caption;
      document = message.document.file_id;
      filename = this.getFilename('doc', message.document.file_name!);
    }
    const commands = CommandsUtils.parseCommands(textMessage);
    if (commands.receipt) super.setFolder(EFolders.receipts);

    super.downloadAndSaveFile(document, filename);
  }

  protected getFilename(text: string, fileName: string): string {
    return `${text}_${this.getStringDate()}_${fileName}`;
  }
}

import {Context} from 'telegraf';
import {Message} from 'typegram';
import SaveFilesAbstractController from '../../../shared/abstract-controllers/save-files.abstract.controller';
import {EFolders} from '../../../shared/enums/folders.enum';

export default class DocumentController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.docs) {
    super(ctx, folder);
  }
  saveDoc() {
    const message = this.ctx.message as Message.DocumentMessage;
    const fileName = this.getFilename('doc', message.document.file_name!);
    super.donwloadAndSaveFile(message.document.file_id, fileName);
  }

  saveRepliedDoc() {
    const message = this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.DocumentMessage;

    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'doc';

    super.donwloadAndSaveFile(
      messageReplied.document.file_id,
      this.getFilename(fileName, messageReplied.document.file_name!)
    );
  }

  protected getFilename(text: string, fileName: string): string {
    return `${text}_${this.getStringDate()}_${fileName}`;
  }
}

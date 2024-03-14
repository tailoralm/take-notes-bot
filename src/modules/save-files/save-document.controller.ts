import {Context} from "telegraf";
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from "./save-files.abstract.controller";

export default class SaveDocumentController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = 'document') {
    super(ctx, folder);
  }
  saveDoc() {
    const message = this.ctx.message as Message.DocumentMessage;
    const fileName = this.getFilename('doc', message.document.file_name!);
    super.saveFile(message.document.file_id, fileName);
  }

  saveRepliedDoc() {
    const message =  this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.DocumentMessage;

    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'doc';

    super.saveFile(messageReplied.document.file_id, this.getFilename(fileName, messageReplied.document.file_name!));
  }

  protected getFilename(text: string, fileName: string): string {
    return `${text}_${this.getStringDate()}_${fileName}`;
  }
}

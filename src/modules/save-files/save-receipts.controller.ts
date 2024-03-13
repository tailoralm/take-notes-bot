import {Context} from "telegraf";
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from "./save-files.abstract.controller";

export default class SaveReceiptsController extends SaveFilesAbstractController {
  constructor(ctx: Context) {
    super(ctx);
  }
  saveReceipt() {
    const message = this.ctx.message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(message.photo);

    const fileName = this.getFilename(message.caption!);
    super.saveFile(fileId, fileName);
  }

  saveRepliedReceipt() {
    const message =  this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(messageReplied.photo);
    const fileName = this.getFilename(message.text);
    super.saveFile(fileId, fileName);
  }

  protected getFilename(text: string): string {
    const fileName = super.getFilename(text);
    return `${fileName}_${this.getStringDate()}.jpg`
  }


}

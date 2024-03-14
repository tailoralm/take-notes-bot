import {Context} from "telegraf";
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from "./save-files.abstract.controller";

export default class SavePhotoController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = 'photos') {
    super(ctx, folder);
  }
  savePhoto() {
    const message = this.ctx.message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(message.photo);

    const fileName = this.getFilename(message.caption!, fileId);
    super.saveFile(fileId, fileName);
  }

  saveRepliedPhoto() {
    const message =  this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(messageReplied.photo);
    const fileName = this.getFilename(message.text, fileId);
    super.saveFile(fileId, fileName);
  }

  protected getFilename(text: string, fileId: string): string {
    return super.getFilename(text, fileId) + '.jpg';
  }


}

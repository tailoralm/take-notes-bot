import {Context} from "telegraf";
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from "./save-files.abstract.controller";
import {EFolders} from "../../shared/folders.enum";

export default class SavePhotoController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.photos) {
    super(ctx, folder);
  }
  savePhoto() {
    const message = this.ctx.message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(message.photo);

    const fileName = this.getFilename(message.caption || 'photo', fileId);
    super.donwloadAndSaveFile(fileId, fileName);
  }

  saveRepliedPhoto() {
    const message =  this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(messageReplied.photo);
    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'photo';
    super.donwloadAndSaveFile(fileId, this.getFilename(fileName, fileId));
  }

  protected getFilename(text: string, fileId: string): string {
    return `${text}_${this.getStringDate()}_${fileId.slice(0,10)}.jpg`;

  }


}

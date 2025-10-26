import { Context } from 'telegraf';
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from '../save-files.abstract.controller';
import { EFolders } from '../folders.enum';

export default class PhotoController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.photos) {
    super(ctx, folder);
  }
  savePhoto() {
    const message = this.ctx.message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(message.photo);

    const fileName = this.getFilename(message.caption || 'photo');
    super.downloadAndSaveFile(fileId, fileName);
  }

  saveRepliedPhoto() {
    const message = this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.PhotoMessage;
    const fileId = PhotoUtils.getFileId(messageReplied.photo);
    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'photo';
    super.downloadAndSaveFile(fileId, this.getFilename(fileName));
  }

  protected getFilename(text: string): string {
    return `${text}_${this.getStringDate()}.jpg`;
  }
}

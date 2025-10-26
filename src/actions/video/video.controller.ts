import { Context } from 'telegraf';
import { Message } from 'typegram';
import SaveFilesAbstractController from '../save-files.abstract.controller';
import { EFolders } from '../folders.enum';

export default class VideoController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.videos) {
    super(ctx, folder);
  }
  saveVideo() {
    const message = this.ctx.message as Message.VideoMessage;
    const fileId = message.video.file_id;

    const fileName = this.getFilename(
      message.caption || 'video',
      message.video.file_name || ''
    );
    super.downloadAndSaveFile(fileId, fileName);
  }

  saveRepliedVideo() {
    const message = this.ctx.message as Message.TextMessage;

    const messageReplied = message.reply_to_message as Message.VideoMessage;
    const fileId = messageReplied.video.file_id;

    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'video';

    super.downloadAndSaveFile(fileId, this.getFilename(fileName, ''));
  }

  protected getFilename(text: string, fileName: string): string {
    if (fileName) fileName = fileName + '_';
    return `${text}_${fileName}${this.getStringDate()}.mp4`;
  }
}

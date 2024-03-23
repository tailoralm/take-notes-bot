import {Context} from 'telegraf';
import {Message} from 'typegram';
import SaveFilesAbstractController from '../../shared/save-files.abstract.controller';
import {EFolders} from '../../shared/folders.enum';

export default class SaveVideoController extends SaveFilesAbstractController {
  constructor(ctx: Context, folder = EFolders.videos) {
    super(ctx, folder);
  }
  saveVideo() {
    const message = this.ctx.message as Message.VideoMessage;
    const fileId = message.video.file_id;

    const fileName = this.getFilename(
      message.caption || message.video.file_name || 'video',
      fileId
    );
    super.donwloadAndSaveFile(fileId, fileName);
  }

  saveRepliedVideo() {
    const message = this.ctx.message as Message.TextMessage;

    const messageReplied = message.reply_to_message as Message.VideoMessage;
    const fileId = messageReplied.video.file_id;

    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'video';

    super.donwloadAndSaveFile(fileId, this.getFilename(fileName, fileId));
  }

  protected getFilename(text: string, fileId: string): string {
    return `${text}_${this.getStringDate()}_${fileId.slice(0, 10)}.mp4`;
  }
}

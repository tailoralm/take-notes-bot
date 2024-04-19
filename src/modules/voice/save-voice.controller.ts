import {Context} from 'telegraf';
import {Message} from 'typegram';
import SaveFilesAbstractController from '../../shared/abstract-controllers/save-files.abstract.controller';
import {EFolders} from '../../shared/enums/folders.enum';

export default class SaveVoiceController extends SaveFilesAbstractController {
  constructor(ctx: Context) {
    super(ctx, EFolders.voices);
  }
  saveVoice() {
    const message = this.ctx.message as Message.VoiceMessage;
    const voiceFileId = message.voice.file_id;

    super.donwloadAndSaveFile(
      voiceFileId,
      this.getFilename('voice', voiceFileId)
    );
  }

  saveRepliedVoice() {
    const message = this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.VoiceMessage;

    const voiceFileId = messageReplied.voice.file_id;
    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'voice';

    super.donwloadAndSaveFile(
      voiceFileId,
      this.getFilename(fileName, voiceFileId)
    );
  }

  protected getFilename(text: string, fileId: string): string {
    return `${text}_${this.getStringDate()}_${fileId}.ogg`;
  }
}

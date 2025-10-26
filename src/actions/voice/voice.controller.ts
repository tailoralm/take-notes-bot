import { Context } from 'telegraf';
import { Message } from 'typegram';
import { EFolders } from '../folders.enum';
import SaveFilesAbstractController from '../save-files.abstract.controller';

export default class VoiceController extends SaveFilesAbstractController {
  constructor(ctx: Context) {
    super(ctx, EFolders.voices);
  }

  save(isReply = false) {
    let voiceFileId: string;
    let fileName: string;
    let date: Date;
    if (isReply) {
      const message = this.ctx.message as Message.TextMessage;
      const splitCaption = message.text.split(' ') as string[];
      const messageReplied = message.reply_to_message as Message.VoiceMessage;
      voiceFileId = messageReplied.voice.file_id;
      fileName = splitCaption.length > 1 ? splitCaption[1] : 'voice';
      date = this.getVoiceDate(messageReplied);
    } else {
      const messageVoice = this.ctx.message as Message.VoiceMessage;
      voiceFileId = messageVoice.voice.file_id;
      fileName = 'voice';
      date = this.getVoiceDate(messageVoice);
    }

    super.downloadAndSaveFile(voiceFileId, this.getFilename(fileName, date));
  }

  getVoiceDate(message: Message.VoiceMessage): Date {
    if (message.forward_date) return new Date(message.forward_date * 1000);
    return new Date(message.date * 1000);
  }

  private getFilename(text: string, date = new Date()): string {
    const dateISO = date.toISOString();
    return `${text}_${dateISO.replaceAll(':', '-')}.ogg`;
  }
}

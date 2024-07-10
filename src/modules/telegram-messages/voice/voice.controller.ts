import { Context } from 'telegraf';
import { Message } from 'typegram';
import SaveFilesAbstractController from '../../../shared/abstract-controllers/save-files.abstract.controller';
import { EFolders } from '../../../shared/enums/folders.enum';
import VoiceProcessorService from './voice-processor.service';

export default class VoiceController extends SaveFilesAbstractController {
  voiceProcessorService: VoiceProcessorService;
  constructor(ctx: Context) {
    super(ctx, EFolders.voices);
    this.voiceProcessorService = new VoiceProcessorService();
  }
  saveVoice() {
    const message = this.ctx.message as Message.VoiceMessage;
    const voiceFileId = message.voice.file_id;

    this.downloadFileAndTranscribe(voiceFileId, this.getFilename('voice'));
  }

  saveRepliedVoice() {
    const message = this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.VoiceMessage;

    const voiceFileId = messageReplied.voice.file_id;
    const splitCaption = message.text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'voice';

    this.downloadFileAndTranscribe(voiceFileId, this.getFilename(fileName));
  }

  private async downloadFileAndTranscribe(
    voiceFileId: string,
    fileName: string
  ) {
    const path = await super.donwloadAndSaveFile(voiceFileId, fileName);
    await this.voiceProcessorService.uploadVoiceFileToS3(path);
    await this.voiceProcessorService.listAndTranscribeFiles();
  }

  protected getFilename(text: string): string {
    const dateISO = new Date().toISOString();
    return `${text}_${dateISO.replaceAll(':', '-')}.ogg`;
  }
}

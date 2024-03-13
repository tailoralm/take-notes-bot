import {Context} from "telegraf";
import { Message } from 'typegram';
import * as PhotoUtils from '../../utils/photo-utils';
import SaveFilesAbstractController from "./save-files.abstract.controller";
import * as GeneralUtils from "../../utils/general-utils";

export default class SaveVoiceController extends SaveFilesAbstractController {
  constructor(ctx: Context) {
    super(ctx);
  }
  saveVoice() {
    const message = this.ctx.message as Message.VoiceMessage;
    const voiceFileId = message.voice.file_id;

    super.saveFile(voiceFileId, '', 'voices');
  }

  saveRepliedVoice() {
    const message =  this.ctx.message as Message.TextMessage;
    const messageReplied = message.reply_to_message as Message.VoiceMessage;

    const voiceFileId = messageReplied.voice.file_id;

    const fileName = this.getFilename(message.text);
    super.saveFile(voiceFileId, fileName, 'voices');
  }

  protected getFilename(text: string): string {
    const fileName = super.getFilename(text);
    return `${fileName}_${this.getStringDate()}.ogg`
  }



}

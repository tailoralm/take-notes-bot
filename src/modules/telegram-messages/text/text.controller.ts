import { Context } from 'telegraf';
import { Message } from 'typegram';
import { EFolders } from '@shared/enums/folders.enum';
import * as GeneralUtils from '@utils/general-utils';

export default class SaveVoiceController {
  constructor(private ctx: Context) {}

  logMessage() {
    const message = this.ctx.message as Message.TextMessage;
    const dateTime = GeneralUtils.formatFullDateTime(new Date());
    const logEntry = `${dateTime}: ${message.text}\n`;

    const nameFile = `${EFolders.notes}/notes.log`;

    GeneralUtils.appendNotesFile(nameFile, logEntry);
  }
}

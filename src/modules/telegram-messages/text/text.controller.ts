import {Context} from 'telegraf';
import {Message} from 'typegram';
import {EFolders} from '../../../shared/enums/folders.enum';
import * as fs from 'fs';
import * as GeneralUtils from '../../../utils/general-utils';

export default class SaveVoiceController {
  constructor(private ctx: Context) {}

  logMessage() {
    const message = this.ctx.message as Message.TextMessage;
    const dateTime = GeneralUtils.formatFullDateTime(new Date());
    const logEntry = `${dateTime}: ${message.text}\n`;

    const nameFile = `${EFolders.notes}/${this.getStringYearMonth()}.log`;

    fs.appendFile(nameFile, logEntry, err => {
      if (err) {
        console.error('Error logging message:', err);
      }
    });
  }

  private getStringYearMonth() {
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth() + 1}`;
  }
}

import {Telegraf} from "telegraf";
import * as GeneralUtils from '../utils/general-utils';


export default class VoiceMessageController {
  static router(bot: Telegraf) {
    bot.on('voice', async (ctx) => {
      const voiceFileId = ctx.message.voice.file_id;

      // Getting the file path from Telegram
      const filePath = await ctx.telegram.getFileLink(voiceFileId);

      GeneralUtils.downloadFile(filePath.toString(), 'downloaded_voice.ogg')
    });

  }
}

import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SaveReceiptsController from "../modules/save-receipts/save-receipts.controller";
import * as AudioUtils from '../utils/audio-utils';

const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

export default class AudioMessageController {
  static router(bot: Telegraf) {
    bot.on('voice', async (ctx) => {
      const voiceFileId = ctx.message.voice.file_id;
      console.log(`Voice File ID: ${voiceFileId}`);

      // Getting the file path from Telegram
      const filePath = await ctx.telegram.getFileLink(voiceFileId);

      AudioUtils.downloadFile(filePath.toString(), 'downloaded_voice.ogg')
    });

  }
}

import {Context, Telegraf} from "telegraf";
import SaveVoiceController from "../modules/save-files/save-voice.controller";
import {Message} from "typegram";
import SaveReceiptsController from "../modules/save-files/save-receipts.controller";


export default class VoiceMessageController {
  static router(bot: Telegraf) {
    bot.on('voice', async (ctx) => {
      // Disable for now
      // new SaveVoiceController(ctx).saveVoice();
    });

  }

  public static replyVoice(ctx: Context){
    const message = ctx.message as Message.TextMessage;

    if(message.text?.startsWith('-s'))
      new SaveVoiceController(ctx).saveRepliedVoice();
  }
}

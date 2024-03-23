import {Context, Telegraf} from "telegraf";
import SaveVoiceController from "../modules/save-files/save-voice.controller";
import {Message} from "typegram";
import SavePhotoController from "../modules/save-files/save-photo.controller";
import * as CommandsUtils from "../utils/commands-utils";


export default class VoiceMessageController {
  static router(bot: Telegraf) {
    bot.on('voice', async (ctx) => {
      new SaveVoiceController(ctx).saveVoice();
    });

  }

  public static replyVoice(ctx: Context){
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if(commands.save)
      new SaveVoiceController(ctx).saveRepliedVoice();
  }
}

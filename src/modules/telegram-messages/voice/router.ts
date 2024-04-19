import {Context, Telegraf} from 'telegraf';
import VoiceController from './voice.controller';
import {Message} from 'typegram';
import * as CommandsUtils from '../../../utils/commands-utils';

export default class VoiceRouter {
  static router(bot: Telegraf) {
    bot.on('voice', async ctx => {
      new VoiceController(ctx).saveVoice();
    });
  }

  public static replyVoice(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) new VoiceController(ctx).saveRepliedVoice();
  }
}

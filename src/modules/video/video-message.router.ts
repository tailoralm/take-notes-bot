import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import SaveVideoController from './save-video.controller';
import * as CommandsUtils from '../../utils/commands-utils';
import {EFolders} from '../../shared/folders.enum';

export default class VideoMessageRouter {
  static router(bot: Telegraf) {
    bot.on('video', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      if (!message.caption) return new SaveVideoController(ctx).saveVideo();

      const commands = CommandsUtils.parseCommands(message.caption);

      if (commands.random)
        return new SaveVideoController(ctx, EFolders.random).saveVideo();
    });
  }

  public static replyVideo(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new SaveVideoController(ctx).saveRepliedVideo();

    return;
  }
}

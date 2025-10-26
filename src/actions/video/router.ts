import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import VideoController from './video.controller';
import * as CommandsUtils from '../../utils/commands-utils';
import {EFolders} from '../folders.enum';

export default class VideoRouter {
  static router(bot: Telegraf) {
    bot.on('video', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      const commands = CommandsUtils.parseCommands(message.caption);

      if (commands.random)
        return new VideoController(ctx, EFolders.random).saveVideo();

      return new VideoController(ctx).saveVideo();
    });
  }

  public static replyVideo(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new VideoController(ctx).saveRepliedVideo();

    if (commands.random)
      return new VideoController(ctx, EFolders.random).saveRepliedVideo();

    return;
  }
}

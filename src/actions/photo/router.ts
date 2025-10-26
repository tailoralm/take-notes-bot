import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import PhotoController from './photo.controller';
import {EFolders} from '../folders.enum';
import * as CommandsUtils from '../../utils/commands-utils';

export default class PhotoRouter {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      const commands = CommandsUtils.parseCommands(message.caption);
      if (commands.receipt)
        return new PhotoController(ctx, EFolders.receipts).savePhoto();

      if (commands.random)
        return new PhotoController(ctx, EFolders.random).savePhoto();

      return new PhotoController(ctx).savePhoto();
    });
  }

  public static replyPhoto(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new PhotoController(ctx).saveRepliedPhoto();

    if (commands.receipt)
      return new PhotoController(ctx, EFolders.receipts).saveRepliedPhoto();

    if (commands.random)
      return new PhotoController(ctx, EFolders.random).saveRepliedPhoto();
  }
}

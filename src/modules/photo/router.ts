import {Context, Telegraf} from 'telegraf';
import {Message} from 'typegram';
import SavePhotoController from './save-photo.controller';
import {EFolders} from '../../shared/enums/folders.enum';
import * as CommandsUtils from '../../utils/commands-utils';

export default class PhotoRouter {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      const commands = CommandsUtils.parseCommands(message.caption);
      if (commands.receipt)
        return new SavePhotoController(ctx, EFolders.receipts).savePhoto();

      if (commands.random)
        return new SavePhotoController(ctx, EFolders.random).savePhoto();

      return new SavePhotoController(ctx).savePhoto();
    });
  }

  public static replyPhoto(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if (commands.save) return new SavePhotoController(ctx).saveRepliedPhoto();

    if (commands.receipt)
      return new SavePhotoController(ctx, EFolders.receipts).saveRepliedPhoto();

    if (commands.random)
      return new SavePhotoController(ctx, EFolders.random).saveRepliedPhoto();
  }
}

import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SavePhotoController from "../modules/save-files/save-photo.controller";
import {EFolders} from "../shared/folders.enum";
import * as CommandsUtils from "../utils/commands-utils";

export default class PhotoMessageController {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      if(!message.caption)
        return new SavePhotoController(ctx).savePhoto();

      const commands = CommandsUtils.parseCommands(message.caption);

      if(commands.receipt)
        return new SavePhotoController(ctx, EFolders.receipts).savePhoto();

      if(commands.random)
        return new SavePhotoController(ctx, EFolders.random).savePhoto();

    });
  }

  public static replyPhoto(ctx: Context){
    const message = ctx.message as Message.TextMessage;
    const commands = CommandsUtils.parseCommands(message.text);

    if(commands.save)
      return new SavePhotoController(ctx).saveRepliedPhoto();

    if(commands.receipt)
      return new SavePhotoController(ctx, EFolders.receipts).saveRepliedPhoto();
  }
}

import {Context, Telegraf} from "telegraf";
import {Message} from "typegram";
import SavePhotoController from "../modules/save-files/save-photo.controller";

export default class PhotoMessageController {
  static router(bot: Telegraf) {
    bot.on('photo', (ctx: Context) => {
      const message = ctx.message as Message.PhotoMessage;

      if(!message.photo)
        return ctx.reply('Please attatch a photo!');

      if(message.caption?.startsWith('-s'))
        return new SavePhotoController(ctx).savePhoto();

      if(message.caption?.startsWith('-r'))
        return new SavePhotoController(ctx, 'receipts').savePhoto();


      return;
    });
  }

  public static replyPhoto(ctx: Context){
    const message = ctx.message as Message.TextMessage;

    if(message.text?.startsWith('-s'))
      return new SavePhotoController(ctx).saveRepliedPhoto();

    if(message.text?.startsWith('-r'))
      return new SavePhotoController(ctx, 'receipts').saveRepliedPhoto();
  }
}

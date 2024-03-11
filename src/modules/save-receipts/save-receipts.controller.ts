import {Context} from "telegraf";
import { Message } from 'typegram';
import { default as axios } from 'axios';
import * as fs from "fs";
import * as PhotoUtils from '../../utils/photo-utils';

export default class SaveReceiptsController {
  constructor() {}
  public static async saveThisPhoto(ctx: Context) {
    console.log('Receipt command activated!')

    const message = ctx.message as Message.PhotoMessage;

    const splitCaption = message.caption?.split(' ') as string[];

    const file = await ctx.telegram.getFile(PhotoUtils.getFileId(message.photo));

    try {
      const response = await PhotoUtils.getPhotoData(file);
      const today = new Date();
      const fileName = `downloads/receipt/${splitCaption[1]}_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}.jpg`;
      fs.writeFileSync(fileName, response.data);

    } catch (error) {
      console.error('Error downloading image:', error);
      ctx.reply('Failed to download the image.');
    }

    return ctx.reply('Image saved successfully!');
  }
}

import {Context} from "telegraf";
import { Message } from 'typegram';
import { default as axios } from 'axios';
import * as fs from "fs";
import * as PhotoUtils from '../../utils/photo-utils';
import * as GeneralUtils from '../../utils/general-utils';

export default class SaveReceiptsController {
  constructor() {}
  public static async saveThisPhoto(ctx: Context) {
    console.log('Receipt command activated!');

    const message = ctx.message as Message.PhotoMessage;
    const splitCaption = message.caption?.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : '';
    const fileUrl = await ctx.telegram.getFileLink(PhotoUtils.getFileId(message.photo));

    try {
      // const response = await PhotoUtils.getPhotoData(file);
      const today = new Date();
      const filePath = `downloads/receipt/${fileName}_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}.jpg`;
      console.log('Saving: ', filePath);
      await GeneralUtils.downloadFile(fileUrl.toString(), filePath);
      // fs.writeFileSync(fullFileName, response.data);

    } catch (error) {
      console.error('Error downloading image:', error);
      ctx.reply('Failed to download the image.');
    }

    return ctx.reply('Image saved successfully!');
  }
}

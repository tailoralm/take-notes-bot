import {Context} from "telegraf";
import { Message } from 'typegram';
import { default as axios } from 'axios';
import * as fs from "fs";

export default class SaveReceiptsController {
  constructor() {}
  public static async save(ctx: Context) {
    console.log('Receipt command activated!')

    const message = ctx.message as Message.PhotoMessage;
    if(!message.photo) {
      return ctx.reply('Please attatch a photo!');
    }

    const photo = message.photo.reduce((prev: any, current: any) => (prev.file_size > current.file_size) ? prev : current);


    const fileID = photo.file_id;
    const file = await ctx.telegram.getFile(fileID);
    const filePath = file.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${filePath}`;

    try {
      const response = await axios.get(fileUrl, {
        responseType: 'arraybuffer'
      });

      const fileName = `image_${Date.now()}.jpg`;
      fs.writeFileSync(fileName, response.data);

    } catch (error) {
      console.error('Error downloading image:', error);
      ctx.reply('Failed to download the image.');
    }

    // Reply to the user
    return ctx.reply('Image saved successfully!');
  }
}

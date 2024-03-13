import {Context} from "telegraf";
import { Message } from 'typegram';
import { default as axios } from 'axios';
import * as fs from "fs";
import * as PhotoUtils from '../../utils/photo-utils';
import * as GeneralUtils from '../../utils/general-utils';

export default class SaveReceiptsController {
  constructor() {}
  public static async saveReceipt(ctx: Context) {
    console.log('Receipt command activated!');

    const message = ctx.message as Message.PhotoMessage;

    const fileName = this.getFilenameFromCommand(message.caption);
    const fileUrl = await ctx.telegram.getFileLink(PhotoUtils.getFileId(message.photo));
    this.saveThisReceipt(ctx, fileName, fileUrl.toString());

  }
  public static async saveReplyedReceipt(ctx: Context) {
    console.log('Receipt replyed command activated!');

    const message = ctx.message as Message.TextMessage;
    const messageReplyed = message.reply_to_message as Message.PhotoMessage;

    const fileName = this.getFilenameFromCommand(message.text);
    const fileUrl = await ctx.telegram.getFileLink(PhotoUtils.getFileId(messageReplyed.photo));

    this.saveThisReceipt(ctx, fileName, fileUrl.toString());
  }

  private static async saveThisReceipt(ctx: Context, fileName: string, fileUrl: string ) {
    try {
      const today = new Date();
      const filePath = `downloads/receipt/${fileName}_${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}.jpg`;
      console.log('Saving: ', filePath);
      await GeneralUtils.downloadFile(fileUrl.toString(), filePath);

    } catch (error) {
      console.error('Error downloading image:', error);
      ctx.reply('Failed to download the image.');
    }

    return ctx.reply('Image saved successfully!');
  }

  static getFilenameFromCommand(text: string | undefined) {
    if(!text) return '';
    const splitCaption = text.split(' ') as string[];
    return splitCaption.length > 1 ? splitCaption[1] : '';
  }



}

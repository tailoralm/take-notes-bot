import {Context} from "telegraf";
import * as GeneralUtils from '../../utils/general-utils';

export default abstract class SaveFilesAbstractController {
  protected constructor(protected ctx: Context) {}
  async saveFile(fileId: string, fileName: string, folder = 'files') {
    const fileUrl = await this.ctx.telegram.getFileLink(fileId);
    const filePath = `downloads/${folder}/${fileName}`;
    console.log('Saving: ', filePath);

    await GeneralUtils.downloadFile(fileUrl.toString(), filePath);
    await this.ctx.reply(`File saved successfully! \nPath: ${filePath}`);

  }

  protected getStringDate(){
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
  }

  protected getFilename(text: string) {
    if(!text) return '';
    const splitCaption = text.split(' ') as string[];
    return splitCaption.length > 1 ? splitCaption[1] : '';
  }

}

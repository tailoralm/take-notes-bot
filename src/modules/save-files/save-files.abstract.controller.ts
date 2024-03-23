import {Context} from "telegraf";
import * as GeneralUtils from '../../utils/general-utils';

export default abstract class SaveFilesAbstractController {
  protected constructor(protected ctx: Context, private folder = 'files') {}
  async donwloadAndSaveFile(fileId: string, fileName: string) {
    const fileUrl = await this.ctx.telegram.getFileLink(fileId);
    const filePath = `${this.folder}/${fileName}`;
    console.log('Saving: ', filePath);

    await GeneralUtils.downloadFile(fileUrl.toString(), filePath)
      .then(() => this.ctx.reply(`File saved successfully! \nPath: ${filePath}`))
      .catch((err: any) => {
        console.error(err);
        this.ctx.reply(`Something went wrong!`);
      });

  }

  protected getStringDate(){
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}`;
  }

  protected getFilename(text: string, fileId: string) {
    const splitCaption = text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'undefined';
    return `${fileName}_${this.getStringDate()}_${fileId}`;
  }

}

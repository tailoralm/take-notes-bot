import {Context} from 'telegraf';
import * as GeneralUtils from '../../utils/general-utils';
import {EFolders} from '../enums/folders.enum';

export default abstract class SaveFilesAbstractController {
  protected constructor(
    protected ctx: Context,
    private folder = EFolders.general
  ) {}
  async donwloadAndSaveFile(fileId: string, fileName: string): Promise<string> {
    const fileUrl = await this.ctx.telegram.getFileLink(fileId);
    const filePath = `${this.folder}/${fileName}`;
    console.log('Saving: ', filePath);

    const path = await GeneralUtils.downloadFile(fileUrl.toString(), filePath);
    await this.ctx.reply('Saved!');
    return path;
  }

  protected getStringDate() {
    const today = new Date();
    return `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  }

  protected getFilename(text: string, fileId: string) {
    const splitCaption = text.split(' ') as string[];
    const fileName = splitCaption.length > 1 ? splitCaption[1] : 'undefined';
    return `${fileName}_${this.getStringDate()}_${fileId}`;
  }
}

import {default as axios} from "axios";
import {File} from "typegram";

export function getPhotoData(file: File) {
  const filePath = file.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${filePath}`;

  return axios.get(fileUrl, { responseType: 'arraybuffer' });
}

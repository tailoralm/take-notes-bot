import {PhotoSize} from "typegram";
import {default as axios} from "axios";
import {File} from "typegram";

export function getPhotoData(file: File) {
  const filePath = file.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${filePath}`;

  return axios.get(fileUrl, { responseType: 'arraybuffer' });
}

export function getFileId(photos: PhotoSize[]) {
  const photo = photos.reduce((prev: any, current: any) => (prev.file_size > current.file_size) ? prev : current);
  return photo.file_id;
}

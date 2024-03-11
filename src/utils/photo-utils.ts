import {PhotoSize} from "typegram";

export function getFileId(photos: PhotoSize[]) {
  const photo = photos.reduce((prev: any, current: any) => (prev.file_size > current.file_size) ? prev : current);
  return photo.file_id;
}

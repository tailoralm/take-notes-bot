import axios from 'axios';
import fs from 'fs';
import * as path from 'path';

export async function downloadFile(fileUrl: string, path: any) {
  const response = await axios({
    method: 'GET',
    url: fileUrl,
    responseType: 'stream',
  });

  ensureDirectoryExistence(path);
  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(path));
    response.data.on('error', reject);
  });
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return;

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname, {recursive: true});
}

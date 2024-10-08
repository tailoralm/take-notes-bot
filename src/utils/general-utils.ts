import axios from 'axios';
import fs from 'fs';
import * as path from 'path';

export async function downloadFile(
  fileUrl: string,
  path: string
): Promise<string> {
  const response = await axios({
    method: 'GET',
    url: fileUrl,
    responseType: 'stream',
  });

  const uniquePath = generateUniqueFilename(path);

  response.data.pipe(fs.createWriteStream(uniquePath));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(uniquePath));
    response.data.on('error', reject);
  });
}

function generateUniqueFilename(filename: string): string {
  const baseName = path.basename(filename, path.extname(filename));
  const extension = path.extname(filename);
  const dirname = path.dirname(filename);
  let uniqueFilename = filename;
  let counter = 1;

  while (fs.existsSync(uniqueFilename)) {
    uniqueFilename = `${dirname}/${baseName} (${counter})${extension}`;
    counter++;
  }
  return uniqueFilename;
}

export function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return;

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname, { recursive: true });
}

export function formatFullDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function appendNotesFile(nameFile: string, logEntry: string) {
  fs.appendFile(nameFile, logEntry, err => {
    if (err) {
      console.error('Error logging message:', err);
    }
  });
}

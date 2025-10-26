import dotenv from 'dotenv';
dotenv.config();

import { EFolders } from './src/actions/folders.enum';
import Router from './src/actions/router';
import { ensureDirectoryExistence } from './src/utils/general-utils';

if (!process.env.DATA_DIR) {
  throw new Error('DATA_DIR environment variable is not set');
}
// Create all folders

Object.values(EFolders).forEach((folder: string) => ensureDirectoryExistence(folder + '/any.jpg'));

new Router();

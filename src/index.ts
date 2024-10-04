import 'dotenv/config';
import Router from './modules/telegram-messages/router';
import { ensureDirectoryExistence } from './utils/general-utils';
import { EFolders } from './shared/enums/folders.enum';

// Create all folders
Object.values(EFolders).forEach((folder: string) =>
  ensureDirectoryExistence(folder + '/any.jpg')
);

new Router();

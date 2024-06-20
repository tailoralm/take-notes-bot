const DEFAULT_PATH = process.env.DATA_DIR || 'DATA_DIR/bot-documents/';

export const EFolders = {
  docs: DEFAULT_PATH + 'docs',
  receipts: DEFAULT_PATH + 'docs/receipts',
  photos: DEFAULT_PATH + 'album',
  videos: DEFAULT_PATH + 'album',
  random: DEFAULT_PATH + 'random',
  notes: DEFAULT_PATH + 'notes',
  voices: DEFAULT_PATH + 'notes/voices',
  general: DEFAULT_PATH + 'files',
};

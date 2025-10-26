const DEFAULT_PATH =
  (process.env.DATA_DIR || './DATA_DIR') + '/telegram/';

export const EFolders = {
  docs: DEFAULT_PATH + 'docs',
  receipts: DEFAULT_PATH + 'docs/receipts',
  photos: DEFAULT_PATH + 'album',
  videos: DEFAULT_PATH + 'album',
  random: DEFAULT_PATH + 'random',
  notes: DEFAULT_PATH + 'notes',
  voices: DEFAULT_PATH + 'voices',
  processedVoices: DEFAULT_PATH + 'voices/processed',
  general: DEFAULT_PATH + 'files',
};

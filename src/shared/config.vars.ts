export const AWS = {
  region: 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_KEY!,
};

export const AWS_VOICES = {
  defaultBucket: 'voices-to-transcribe',
  processedBucket: 'transcribed-voices',
  transcribedFiles: 'transcribed-voices/text-files',
};

// TYPES
// export interface IAWS {
//   region: string;
//   accessKeyId: string;
//   secretAccessKey: string;
// }
//
// export interface IAWSVoices {
//   defaultBucket: string;
//   processedBucket: string;
//   transcribedFiles: string;
// }

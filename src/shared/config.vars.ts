export const AWS = {
  region: 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_KEY!,
};

export const AWS_VOICES_S3 = {
  voicesToTranscribe: 'voices-to-transcribe',
  transcribedTextVoices: 'transcribed-voices',
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

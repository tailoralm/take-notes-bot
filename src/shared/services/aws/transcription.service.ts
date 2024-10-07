import {
  GetTranscriptionJobCommand,
  LanguageCode,
  MediaFormat,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';
import { S3Client } from '@aws-sdk/client-s3';
import AwsServicesFactory from '../../aws-services.factory';
import { AWS_VOICES_S3 } from '../../config.vars';

export class TranscriptionService {
  private transcribeClient: TranscribeClient;
  private s3Client: S3Client;

  constructor() {
    this.transcribeClient = AwsServicesFactory.TranscribeClient();
    this.s3Client = AwsServicesFactory.S3Client();
  }

  async startTranscriptionJob(
    jobName: string,
    languageCode: LanguageCode,
    mediaFileUri: string,
    mediaFormat: MediaFormat = 'ogg'
  ) {
    // Start the transcription job
    const params = {
      TranscriptionJobName: jobName,
      LanguageCode: languageCode,
      Media: { MediaFileUri: mediaFileUri },
      MediaFormat: mediaFormat,
      OutputBucketName: AWS_VOICES_S3.transcribedTextVoices,
    };

    await this.transcribeClient.send(new StartTranscriptionJobCommand(params));
  }

  async getTranscriptionJob(jobName: string) {
    // Get transcription job status
    const params = { TranscriptionJobName: jobName };
    const { TranscriptionJob } = await this.transcribeClient.send(
      new GetTranscriptionJobCommand(params)
    );
    return TranscriptionJob!;
  }
}

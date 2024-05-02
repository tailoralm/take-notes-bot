import {
  GetTranscriptionJobCommand,
  LanguageCode,
  MediaFormat,
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';
import {S3Client} from '@aws-sdk/client-s3';

export class VoiceToTextService {
  private transcribeClient: TranscribeClient;
  private s3Client: S3Client;
  private region: string;
  private outputBucket: string;

  constructor(region: string, accessKeyId: string, secretAccessKey: string) {
    // // Configure AWS credentials and region
    // AWS.config.update({region, accessKeyId, secretAccessKey});

    // Create a new TranscribeService object
    this.transcribeClient = new TranscribeClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Set up S3 client
    this.s3Client = new S3Client({region});
    this.region = region;
    this.outputBucket = 'voices-processed';
  }

  async startTranscriptionJob(
    jobName: string,
    languageCode: LanguageCode,
    mediaFileUri: string,
    mediaFormat: MediaFormat = 'mp3'
  ): Promise<void> {
    // Start the transcription job
    const params = {
      TranscriptionJobName: jobName,
      LanguageCode: languageCode,
      Media: {MediaFileUri: mediaFileUri},
      MediaFormat: mediaFormat,
      OutputBucketName: this.outputBucket,
    };

    await this.transcribeClient.send(new StartTranscriptionJobCommand(params));
  }

  async getTranscriptionJobStatus(jobName: string): Promise<string> {
    // Get transcription job status
    const params = {TranscriptionJobName: jobName};
    const {TranscriptionJob} = await this.transcribeClient.send(
      new GetTranscriptionJobCommand(params)
    );
    return TranscriptionJob!.TranscriptionJobStatus!;
  }
}

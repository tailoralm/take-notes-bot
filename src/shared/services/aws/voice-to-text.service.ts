import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {TranscriptionService} from '@shared/services/aws/transcription.service';
import {AWS_VOICES, AWS} from '@shared/config.vars';
import LoggerUtils from '@utils/logger-utils';

export default class VoiceToTextService {
  private s3Client: S3Client;
  private transcriptionService: TranscriptionService;
  private logger: LoggerUtils;

  constructor() {
    this.s3Client = new S3Client({region: AWS.region});
    this.logger = new LoggerUtils('VoiceToTextService');
    this.transcriptionService = new TranscriptionService(
      AWS.region,
      AWS.accessKeyId,
      AWS.secretAccessKey!
    );
  }

  async listAndTranscribeFiles(): Promise<void> {
    try {
      const listParams = {Bucket: AWS_VOICES.defaultBucket};
      const listResponse = await this.s3Client.send(
        new ListObjectsCommand(listParams)
      );

      if (
        listResponse.$metadata.httpStatusCode === 200 &&
        listResponse.Contents
      ) {
        for (const file of listResponse.Contents) {
          if (file.Key) {
            await this.transcriptionService
              .startTranscriptionJob(file.Key, 'pt-BR', file.Key)
              .then(() => this.moveFileToProcessedBucket(file.Key!));
          }
        }
      }
    } catch (error: any) {
      this.logger.logError('Error creating transcription job', error);
    }
  }

  private async moveFileToProcessedBucket(fileKey: string): Promise<void> {
    // Copy the file to the new bucket
    const copyParams = {
      Bucket: AWS_VOICES.processedBucket,
      CopySource: `${AWS_VOICES.defaultBucket}/${fileKey}`,
      Key: fileKey,
    };
    await this.s3Client.send(new CopyObjectCommand(copyParams));

    // Delete the file from the original bucket
    const deleteParams = {
      Bucket: AWS_VOICES.defaultBucket,
      Key: fileKey,
    };
    await this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }
}

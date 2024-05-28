import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {VoiceToTextService} from '@shared/services/ai-services/voice-to-text.service';
import {AWS_VOICES, AWS} from '@shared/config.vars';

export default class VoiceToTextRoutine {
  private s3Client: S3Client;
  private voiceToTextService: VoiceToTextService;

  constructor() {
    this.s3Client = new S3Client({region: AWS.region});
    this.voiceToTextService = new VoiceToTextService(
      AWS.region,
      AWS.accessKeyId,
      AWS.secretAccessKey!
    );
  }

  run() {
    try {
      this.listAndTranscribeFiles();
    } catch (error) {
      console.error('Error processing files: ', error);
    }
  }

  private async listAndTranscribeFiles(): Promise<void> {
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
          await this.voiceToTextService
            .startTranscriptionJob(file.Key, 'pt-BR', file.Key)
            .then(() => this.moveFileToProcessedBucket(file.Key!));
        }
      }
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

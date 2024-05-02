import {ListObjectsCommand, S3Client} from '@aws-sdk/client-s3';
import {VoiceToTextService} from '../../../shared/services/ai-services/voice-to-text.service';

export default class VoiceToTextRoutine {
  private s3Client: S3Client;
  private region: string;
  private voiceToTextService: VoiceToTextService;

  constructor(region: string) {
    this.region = region;
    this.s3Client = new S3Client({region});
    this.voiceToTextService = new VoiceToTextService(
      region,
      process.env.AWS_ACCESS_KEY!,
      process.env.AWS_SECRET_KEY!
    );
  }

  run() {
    // process
    // find some way to register the file was processed
  }

  async listAndTranscribeFiles(inputBucket: string): Promise<void> {
    try {
      const listParams = {Bucket: inputBucket};
      const listResponse = await this.s3Client.send(
        new ListObjectsCommand(listParams)
      );

      if (listResponse.Contents) {
        for (const file of listResponse.Contents) {
          if (file.Key) {
            await this.voiceToTextService.startTranscriptionJob(
              file.Key,
              'pt-BR',
              file.Key
            );
          }
        }
      }
    } catch (error) {
      console.error('Error listing or transcribing files:', error);
    }
  }
}

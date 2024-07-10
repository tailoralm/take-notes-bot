import { AWS_VOICES_S3 } from '../../../shared/config.vars';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import * as GeneralUtils from '../../../utils/general-utils';
import LoggerUtils from '../../../utils/logger-utils';
import AwsServicesFactory from '../../../shared/aws-services.factory';
import { TranscriptionService } from '../../../shared/services/aws/transcription.service';

export default class VoiceProcessorService {
  private s3Client: S3Client;
  private logger: LoggerUtils;
  private transcriptionService: TranscriptionService;

  constructor() {
    this.s3Client = AwsServicesFactory.S3Client();
    this.logger = new LoggerUtils('VoiceProcessorService');
    this.transcriptionService = new TranscriptionService();
  }

  async uploadVoiceFileToS3(filePath: string) {
    try {
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: AWS_VOICES_S3.voicesToTranscribe,
        Key: path.basename(filePath),
        Body: fileStream,
      };

      const data = await this.s3Client.send(new PutObjectCommand(uploadParams));
      this.logger.logInfo('Upload Success', data);
      this.moveVoiceFileToProcessedFolder(filePath);
    } catch (error: any) {
      this.logger.logError('Error uploading file', error);
    }
  }

  async uploadVoiceFolderToS3(folder: string) {
    try {
      const files = fs.readdirSync(folder);
      for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.lstatSync(filePath).isFile()) {
          await this.uploadVoiceFileToS3(filePath);
        }
      }
    } catch (error: any) {
      this.logger.logError('Error uploading folder', error);
    }
  }

  async listAndTranscribeFiles(): Promise<void> {
    try {
      const listParams = { Bucket: AWS_VOICES_S3.voicesToTranscribe };
      const listResponse = await this.s3Client.send(
        new ListObjectsCommand(listParams)
      );

      if (
        listResponse.$metadata.httpStatusCode === 200 &&
        listResponse.Contents
      ) {
        for (const file of listResponse.Contents) {
          this.logger.logInfo(file);
          if (file.Key && file.Key.includes('.ogg')) {
            await this.transcriptionService
              .startTranscriptionJob(
                file.Key,
                'pt-BR',
                `s3://${AWS_VOICES_S3.voicesToTranscribe}/${file.Key}`
              )
              .then(() => this.moveFileToProcessedBucket(file.Key!));
          }
        }
      }
    } catch (error: any) {
      this.logger.logError('Error creating transcription job -', error);
    }
  }

  private async moveFileToProcessedBucket(fileKey: string): Promise<void> {
    // Copy the file to the new bucket
    const copyParams = {
      Bucket: AWS_VOICES_S3.voicesToTranscribe,
      CopySource: `${AWS_VOICES_S3.voicesToTranscribe}/${fileKey}`,
      Key: 'transcribed/' + fileKey,
    };
    await this.s3Client.send(new CopyObjectCommand(copyParams));

    // Delete the file from the original bucket
    const deleteParams = {
      Bucket: AWS_VOICES_S3.voicesToTranscribe,
      Key: fileKey,
    };
    await this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }

  private moveVoiceFileToProcessedFolder(filePath: string) {
    try {
      const processedFolderPath = path.join(
        path.dirname(filePath),
        'processed'
      );

      GeneralUtils.ensureDirectoryExistence(processedFolderPath);

      const destinationPath = path.join(
        processedFolderPath,
        path.basename(filePath)
      );

      fs.renameSync(filePath, destinationPath);

      this.logger.logInfo('File moved to processed folder successfully');
    } catch (error: any) {
      this.logger.logError('Error moving file to processed folder -', error);
    }
  }
}

import {AWS, AWS_VOICES} from '@shared/config.vars';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import * as GeneralUtils from '@utils/general-utils';
import LoggerUtils from '@utils/logger-utils';

export default class VoiceProcessorService {
  private s3Client: S3Client;
  private logger: LoggerUtils;

  constructor() {
    this.s3Client = new S3Client({region: AWS.region});
    this.logger = new LoggerUtils('VoiceProcessorService');
  }

  async uploadVoiceFileToS3(filePath: string) {
    try {
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: AWS_VOICES.defaultBucket,
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

  moveVoiceFileToProcessedFolder(filePath: string) {
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
      this.logger.logError('Error moving file to processed folder', error);
    }
  }
}

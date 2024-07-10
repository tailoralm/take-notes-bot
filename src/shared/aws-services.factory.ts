import { S3Client } from '@aws-sdk/client-s3';
import { AWS } from './config.vars';
import { TranscribeClient } from '@aws-sdk/client-transcribe';

export default class AwsServicesFactory {
  static S3Client() {
    return new S3Client({
      region: AWS.region,
      credentials: {
        accessKeyId: AWS.accessKeyId,
        secretAccessKey: AWS.secretAccessKey,
      },
    });
  }

  static TranscribeClient() {
    return new TranscribeClient({
      region: AWS.region,
      credentials: {
        accessKeyId: AWS.accessKeyId,
        secretAccessKey: AWS.secretAccessKey,
      },
    });
  }
}

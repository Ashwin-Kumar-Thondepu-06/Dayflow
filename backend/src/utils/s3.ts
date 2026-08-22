import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../config';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Initialize S3 Client (compatible with Minio)
export const s3Client = new S3Client({
  region: 'us-east-1', // Minio defaults to us-east-1
  endpoint: `http://${config.MINIO_ENDPOINT || 'localhost'}:${config.MINIO_PORT || '9000'}`,
  credentials: {
    accessKeyId: config.MINIO_ACCESS_KEY || 'minioadmin',
    secretAccessKey: config.MINIO_SECRET_KEY || 'minioadmin',
  },
  forcePathStyle: true, // Required for Minio
});

export const uploadFileToS3 = async (
  fileBuffer: Buffer,
  originalName: string,
  mimetype: string,
  folder: string = 'logos'
): Promise<string> => {
  const bucket = config.MINIO_BUCKET || 'dayflow';
  const fileExtension = path.extname(originalName);
  const fileName = `${folder}/${uuidv4()}${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  });

  await s3Client.send(command);

  // Return the public URL for the file
  return `http://${config.MINIO_ENDPOINT || 'localhost'}:${config.MINIO_PORT || '9000'}/${bucket}/${fileName}`;
};

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: this.configService.get('MINIO_ACCESS_KEY', 'minioadmin'),
      secretKey: this.configService.get('MINIO_SECRET_KEY', 'minioadmin'),
    });

    this.bucketName = this.configService.get(
      'MINIO_BUCKET_NAME',
      'nestjs-bucket',
    );
  }

  async onModuleInit() {
    await this.createBucketIfNotExists();
  }

  private async createBucketIfNotExists() {
    try {
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Bucket ${this.bucketName} created successfully`);

        // Set public read policy for the bucket
        await this.setPublicBucketPolicy();
      }
    } catch (error) {
      this.logger.error(`Error creating bucket: ${error.message}`);
      throw error;
    }
  }

  private async setPublicBucketPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    };

    await this.minioClient.setBucketPolicy(
      this.bucketName,
      JSON.stringify(policy),
    );
    this.logger.log(`Public read policy set for bucket ${this.bucketName}`);
  }

  async uploadFile(file: Express.Multer.File, objectName?: string) {
    try {
      const fileName =
        objectName || `${randomUUID()}${path.extname(file.originalname)}`;

      await this.minioClient.putObject(
        this.bucketName,
        fileName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
          'Original-Filename': file.originalname, // Store original filename in metadata
        },
      );

      this.logger.log(`File uploaded successfully: ${fileName}`);
      return fileName;
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw error;
    }
  }

  async getFileUrl(objectName: string, expiry = 24 * 60 * 60) {
    try {
      return await this.minioClient.presignedGetObject(
        this.bucketName,
        objectName,
        expiry,
      );
    } catch (error) {
      this.logger.error(`Error generating file URL: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(objectName: string) {
    try {
      await this.minioClient.removeObject(this.bucketName, objectName);
      this.logger.log(`File deleted successfully: ${objectName}`);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  }

  async listFiles(prefix = ''): Promise<Minio.BucketItem[]> {
    try {
      const stream = this.minioClient.listObjectsV2(
        this.bucketName,
        prefix,
        true,
      );

      const files: Minio.BucketItem[] = [];

      for await (const obj of stream) {
        files.push(obj);
      }

      return files;
    } catch (error) {
      this.logger.error(`Error listing files: ${error.message}`);
      throw error;
    }
  }

  async getFileMetadata(objectName: string): Promise<Minio.BucketItemStat> {
    try {
      return await this.minioClient.statObject(this.bucketName, objectName);
    } catch (error) {
      this.logger.error(`Error getting file metadata: ${error.message}`);
      throw error;
    }
  }
}

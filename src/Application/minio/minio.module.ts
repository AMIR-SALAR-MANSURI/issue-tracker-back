// src/minio/minio.module.ts
import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { FilesController } from 'src/EndPoint/minio/minio.controller';

@Module({
  providers: [MinioService],
  controllers: [FilesController],
  exports: [MinioService],
})
export class MinioModule {}

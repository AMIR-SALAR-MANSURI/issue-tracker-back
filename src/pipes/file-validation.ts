// src/pipes/file-validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number = 1024 * 1024 * 5, // 5MB
    private readonly allowedTypes: string[] = [
      'image/jpeg',
      'image/png',
      'application/pdf',
    ],
  ) {}

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('File is required');
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxSize / 1024 / 1024}MB`,
      );
    }

    if (!this.allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        `File type ${value.mimetype} is not allowed`,
      );
    }

    return value;
  }
}

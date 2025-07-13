import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/Application/minio/minio.service';

@Controller('files')
export class FilesController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  //   @UseInterceptors(FileInterceptor('file')) // Must match FormData field name
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const fileName = await this.minioService.uploadFile(file);
    const fileUrl = await this.minioService.getFileUrl(fileName);

    return {
      status: 'success',
      fileName,
      fileUrl,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      file,
    };
  }

  @Get('list')
  async listFiles(@Query('prefix') prefix?: string) {
    return await this.minioService.listFiles(prefix);
  }

  @Get(':fileName/url')
  async getFileUrl(@Param('fileName') fileName: string) {
    return {
      url: await this.minioService.getFileUrl(fileName),
    };
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.minioService.deleteFile(fileName);
    return { message: 'File deleted successfully' };
  }
}

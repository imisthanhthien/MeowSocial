import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

interface UploadedFileType {
  originalname: string;
  mimetype: string;
  size: number;
  filename: string;
}

const allowedImageTypes = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          if (!allowedImageTypes.includes(ext)) {
            return cb(new Error('Định dạng ảnh không hợp lệ'), '');
          }
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async uploadFile(@UploadedFile() file: UploadedFileType) {
    if (!file) throw new BadRequestException('Không có file hợp lệ được gửi lên');
    return this.uploadService.saveFile(file);
  }
}

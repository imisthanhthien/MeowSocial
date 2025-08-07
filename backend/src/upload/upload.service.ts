import { Injectable } from '@nestjs/common';

interface UploadedFileType {
  originalname: string;
  mimetype: string;
  size: number;
  filename: string;
}

@Injectable()
export class UploadService {
  saveFile(file: UploadedFileType) {
    const imageUrl = `/uploads/${file.filename}`;
    return {
      message: 'Upload thành công',
      imageUrl,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}

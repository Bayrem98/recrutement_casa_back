import { Injectable } from '@nestjs/common';
import toStream = require('buffer-to-stream');
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    fileName: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.config({
        cloud_name: 'dbnljryjc',
        api_key: '552237126716848',
        api_secret: 't1yOFzk9qiMDLTbO416jzHc5X00',
        secure: true,
      });

      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Auto-detect resource type
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(fileName.buffer).pipe(upload);
    });
  }
}

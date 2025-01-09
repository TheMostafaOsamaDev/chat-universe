import { Request } from 'express';
import { diskStorage } from 'multer';
import path from 'path';

// Avatar storage configuration
const avatarDestination = path.join(__dirname, '../../client/avatars/temp');
export const avatarDiskStorageConfig = {
  storage: diskStorage({
    destination: avatarDestination,
    filename: (req, file, callback) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};

// Chat files storage configuration
const chatDestination = path.join(__dirname, '../../client/chat');
export const chatDiskStorageConfig = {
  storage: diskStorage({
    destination: chatDestination,
    filename: (req, file, callback) => {
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const allowedTypes = [
      'image/',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.some((type) => file.mimetype.startsWith(type))) {
      return callback(
        new Error('Only image, PDF, Word, or text files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
};

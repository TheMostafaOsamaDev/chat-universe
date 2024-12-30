import { Request } from 'express';
import { diskStorage } from 'multer';
import path from 'path';

const destination = path.join(__dirname, '../../client/avatars/temp');

console.log(destination);

export const diskStorageConfig = {
  storage: diskStorage({
    destination,
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

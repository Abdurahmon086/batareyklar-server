import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads${req.path}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + file.originalname.split('.')[1]);
  },
});

export const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Faqat rasmlar!'), false);
  }
  cb(null, true);
};

export const deleteImage = async (imagePath: string) => {
  const filePath = path.join('uploads', imagePath);
  try {
    return await fs.promises.unlink(filePath);
  } catch (err) {
    throw new Error(`File deletion failed: ${err.message}`);
  }
};

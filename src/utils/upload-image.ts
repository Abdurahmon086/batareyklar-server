import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${req.path.split('/')[1]}`);
    },
    filename: (req, file, cb) => {
      const randomName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, randomName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Faqat rasm formatlari ruxsat etilgan!'), false);
    }
  },
};

export const deleteImage = async (imagePath: string) => {
  const filePath = path.join('uploads', imagePath);
  try {
    return await fs.promises.unlink(filePath);
  } catch (err) {
    throw new Error(`File deletion failed: ${err.message}`);
  }
};

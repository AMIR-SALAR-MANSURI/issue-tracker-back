import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique file names


export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Directory where files will be saved
    filename: (req, file, cb) => {
      const uniqueFileName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, uniqueFileName);
    },
  }),
};
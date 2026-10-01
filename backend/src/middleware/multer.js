import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imageUploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueName = uuidv4();
    cb(null, `product-${uniqueName}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

export default upload;

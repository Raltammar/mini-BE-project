import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// 1. Custom storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

// 2. File type filter: only jpg, jpeg, png
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpg|jpeg|png/;

  const extIsValid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeIsValid = allowedTypes.test(file.mimetype);

  if (extIsValid && mimeIsValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
  }
};

// 3. Export configured multer instance
const upload = multer({ storage, fileFilter });

export default upload;

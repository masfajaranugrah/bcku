// src/shared/middleware/uploadMiddleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";

function makeStorage(folder: "profile" | "absensi") {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.body.userId || req.params.userId || Date.now().toString();
      const uploadPath = path.join(__dirname, `../../../uploads/${folder}/${userId}`);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
   filename: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase(); 
  const filename = `${Date.now()}${ext}`;
  cb(null, filename);
},
  });
}

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diizinkan"), false);
  }
};

export const uploadProfile = multer({
  storage: makeStorage("profile"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadAbsensi = multer({
  storage: makeStorage("absensi"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

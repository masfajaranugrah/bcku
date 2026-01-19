"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAbsensi = exports.uploadProfile = void 0;
// src/shared/middleware/uploadMiddleware.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function makeStorage(folder) {
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const userId = req.body.userId || req.params.userId || Date.now().toString();
            const uploadPath = path_1.default.join(__dirname, `../../../uploads/${folder}/${userId}`);
            if (!fs_1.default.existsSync(uploadPath)) {
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname).toLowerCase();
            const filename = `${Date.now()}${ext}`;
            cb(null, filename);
        },
    });
}
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Hanya file gambar yang diizinkan"), false);
    }
};
exports.uploadProfile = (0, multer_1.default)({
    storage: makeStorage("profile"),
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});
exports.uploadAbsensi = (0, multer_1.default)({
    storage: makeStorage("absensi"),
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});
//# sourceMappingURL=uploadMiddleware.js.map
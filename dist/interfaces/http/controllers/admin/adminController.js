"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminRespository_1 = require("./../../../../infrastructure/repositories/admin/adminRespository");
const adminUseCase_1 = require("@application/usecase/admin/adminUseCase");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const asminRespository = new adminRespository_1.AdminRespository();
const adminUseCase = new adminUseCase_1.AdminUseCase(asminRespository);
class adminController {
    static async getFile(req, res) {
        try {
            const { folder, userId, filename } = req.params;
            if (!folder || !userId || !filename) {
                return res.status(400).json({ message: "Parameter tidak lengkap" });
            }
            // validasi folder supaya cuma boleh "profile" atau "absensi"
            if (!["profile", "absensi"].includes(folder)) {
                return res.status(400).json({ message: "Folder tidak valid" });
            }
            const filePath = path_1.default.join(__dirname, `../../../uploads/${folder}/${userId}/${filename}`);
            if (!fs_1.default.existsSync(filePath)) {
                return res.status(404).json({ message: "File tidak ditemukan" });
            }
            return res.sendFile(filePath);
        }
        catch (err) {
            return res.status(500).json({ message: "Terjadi kesalahan", error: err });
        }
    }
    static async getAllMembers(req, res, next) {
        try {
            // ambil companyId dari URL atau fallback dari JWT
            const companyId = req.params.companyId || req.user?.companyId;
            if (!companyId) {
                return res.status(400).json({ message: "Company ID tidak ditemukan" });
            }
            if (!companyId) {
                return res.status(400).json({ message: "Company ID tidak ditemukan" });
            }
            // panggil use case
            const result = await adminUseCase.getAllMembers(companyId);
            return res.status(200).json({
                data: result.data,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMemberById(req, res, next) {
        try {
            const { id, companyId } = req.params;
            const member = await adminUseCase.getMemberById(id, companyId);
            return res.status(200).json(member);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateMember(req, res, next) {
        try {
            const { id, companyId } = req.params;
            const updated = await adminUseCase.updateMember(id, companyId, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteMember(req, res, next) {
        try {
            const { id, companyId } = req.params;
            const deleted = await adminUseCase.deleteMember(id, companyId);
            return res.status(200).json(deleted);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.adminController = adminController;
//# sourceMappingURL=adminController.js.map
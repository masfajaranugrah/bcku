"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionController = void 0;
const permissionUseCase_1 = require("@application/usecase/member/permissionUseCase");
const permissionUseCase = new permissionUseCase_1.PermissionUseCase();
class permissionController {
    static async create(req, res, next) {
        try {
            const { name, description } = req.body;
            const { companyId } = req.params;
            if (!name)
                return res.status(400).json({ message: "Nama wajib diisi" });
            if (!companyId)
                return res.status(400).json({ message: "companyId wajib ada" });
            const permission = await permissionUseCase.createPermission({ name, description, companyId });
            res.status(201).json({ message: "Permission berhasil dibuat", data: permission });
        }
        catch (error) {
            next(error);
        }
    }
    static async findAll(req, res, next) {
        try {
            const { companyId } = req.params;
            if (!companyId)
                return res.status(400).json({ message: "companyId wajib ada" });
            const permissions = await permissionUseCase.getPermission({ companyId });
            res.status(200).json({ data: permissions });
        }
        catch (error) {
            next(error);
        }
    }
    static async findById(req, res, next) {
        try {
            const { companyId, id } = req.params;
            if (!id || !companyId)
                return res.status(400).json({ message: "ID dan companyId wajib ada" });
            const permission = await permissionUseCase.getPermissionById(id, companyId);
            if (!permission)
                return res.status(404).json({ message: "Permission tidak ditemukan" });
            res.status(200).json({ data: permission });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { companyId, id } = req.params;
            const { name, description } = req.body;
            if (!id || !companyId)
                return res.status(400).json({ message: "ID dan companyId wajib ada" });
            if (!name || !description)
                return res.status(400).json({ message: "Nama dan deskripsi wajib diisi" });
            const updatedPermission = await permissionUseCase.updatePermission(id, { name, description, companyId });
            if (!updatedPermission)
                return res.status(404).json({ message: "Permission tidak ditemukan" });
            res.status(200).json({ message: "Permission berhasil diperbarui", data: updatedPermission });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const { companyId, id } = req.params;
            if (!id || !companyId)
                return res.status(400).json({ message: "ID dan companyId wajib ada" });
            const deleted = await permissionUseCase.deletePermission(id, companyId);
            if (!deleted)
                return res.status(404).json({ message: "Permission tidak ditemukan" });
            res.status(200).json({ message: "Permission berhasil dihapus" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.permissionController = permissionController;
//# sourceMappingURL=permissionController.js.map
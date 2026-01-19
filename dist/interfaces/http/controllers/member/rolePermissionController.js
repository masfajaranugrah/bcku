"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionController = void 0;
const rolePermissionUseCase_1 = require("@application/usecase/member/rolePermissionUseCase");
const rolePermissionUseCase = new rolePermissionUseCase_1.RolePermissionUseCase();
class RolePermissionController {
    // Ambil semua permissions dari role tertentu
    static async getPermissionsByRole(req, res, next) {
        try {
            const { roleId, companyId } = req.params;
            if (!roleId || !companyId) {
                return res.status(400).json({ status: "fail", message: "Role ID dan Company ID diperlukan" });
            }
            const permissions = await rolePermissionUseCase.getPermissionsByRole({ roleId, companyId });
            return res.status(200).json({
                status: "success",
                message: "Permissions fetched successfully",
                data: permissions,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Assign permissions baru ke role (tanpa hapus yang lama)
    static async assignPermissionsToRole(req, res, next) {
        try {
            const { roleId, companyId } = req.params;
            const { permissionIds } = req.body;
            if (!roleId || !companyId)
                return res.status(400).json({ status: "fail", message: "Role ID dan Company ID diperlukan" });
            if (!Array.isArray(permissionIds) || permissionIds.length === 0)
                return res.status(400).json({ status: "fail", message: "permissionIds harus berupa array dan tidak kosong" });
            // Validasi permissionIds sebelum assign
            const validPermissions = await rolePermissionUseCase.validatePermissions(permissionIds);
            if (validPermissions.length !== permissionIds.length) {
                const invalidIds = permissionIds.filter(id => !validPermissions.includes(id));
                return res.status(400).json({
                    status: "fail",
                    message: `Permission ID tidak valid: ${invalidIds.join(", ")}`
                });
            }
            const created = await rolePermissionUseCase.assignPermissionsToRole({ roleId, permissionIds, companyId });
            return res.status(201).json({
                status: "success",
                message: "Permissions assigned to role successfully",
                data: created,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Replace semua permissions untuk role tertentu
    static async updatePermissionsForRole(req, res, next) {
        try {
            const { roleId, companyId } = req.params;
            const { permissionIds } = req.body;
            if (!roleId || !companyId)
                return res.status(400).json({ status: "fail", message: "Role ID dan Company ID diperlukan" });
            if (!Array.isArray(permissionIds)) {
                return res.status(400).json({ status: "fail", message: "permissionIds harus berupa array" });
            }
            const updated = await rolePermissionUseCase.updatePermissionsForRole({ roleId, permissionIds, companyId });
            return res.status(200).json({
                status: "success",
                message: "Permissions updated successfully",
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Hapus satu permission dari role
    static async removePermissionFromRole(req, res, next) {
        try {
            const { roleId, permissionId, companyId } = req.params;
            if (!roleId || !permissionId || !companyId) {
                return res.status(400).json({ status: "fail", message: "Role ID, Permission ID, dan Company ID wajib ada" });
            }
            const success = await rolePermissionUseCase.removePermissionFromRole({ roleId, permissionId, companyId });
            return res.status(200).json({
                status: success ? "success" : "fail",
                message: success ? "Permission removed successfully" : "Permission not found for this role",
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Hapus semua permissions dari role
    static async removeAllPermissionsFromRole(req, res, next) {
        try {
            const { roleId, companyId } = req.params;
            if (!roleId || !companyId) {
                return res.status(400).json({ status: "fail", message: "Role ID dan Company ID diperlukan" });
            }
            const success = await rolePermissionUseCase.removeAllPermissionsFromRole({ roleId, companyId });
            return res.status(200).json({
                status: success ? "success" : "fail",
                message: success ? "All permissions removed from role" : "No permissions found for this role",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RolePermissionController = RolePermissionController;
//# sourceMappingURL=rolePermissionController.js.map
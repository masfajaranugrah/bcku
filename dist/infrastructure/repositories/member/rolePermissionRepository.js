"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionRepository = void 0;
const rolePermissionModel_1 = __importDefault(require("@infrastructure/database/models/member/rolePermissionModel"));
const permissionsModel_1 = __importDefault(require("@infrastructure/database/models/member/permissionsModel")); // pastikan ini model permissions
const models_1 = require("@infrastructure/database/models");
class RolePermissionRepository {
    // Cari semua permission untuk role tertentu di company tertentu
    async findByRoleIdAndCompany(roleId, companyId) {
        const role = await models_1.RoleModel.findOne({
            where: { id: roleId },
            include: [
                {
                    model: permissionsModel_1.default,
                    as: "permissions",
                    attributes: ["name"],
                    through: {
                        attributes: [],
                        where: { companyId },
                    },
                },
            ],
        });
        return (role?.permissions || []).map((p) => p.name);
    }
    // Buat role-permission baru dengan companyId
    async create(data) {
        const created = await rolePermissionModel_1.default.create(data);
        return created.toJSON();
    }
    // Hapus satu permission dari role di company tertentu
    async deleteByRolePermissionAndCompany(roleId, permissionId, companyId) {
        return await rolePermissionModel_1.default.destroy({
            where: { roleId, permissionId, companyId },
        });
    }
    // Hapus semua permission dari role di company tertentu
    async deleteAllByRoleAndCompany(roleId, companyId) {
        return await rolePermissionModel_1.default.destroy({
            where: { roleId, companyId },
        });
    }
    // Replace semua permissions untuk role di company tertentu
    async updatePermissions(roleId, newPermissionIds, companyId) {
        // Hapus semua permission lama
        await this.deleteAllByRoleAndCompany(roleId, companyId);
        // Insert permission baru
        const newRecords = newPermissionIds.map(permissionId => ({
            roleId,
            permissionId,
            companyId,
        }));
        const created = await rolePermissionModel_1.default.bulkCreate(newRecords, { returning: true });
        return created.map((c) => c.toJSON());
    }
    // Validasi permissionIds: kembalikan hanya permissionId yang valid (ada di tabel permissions)
    async findExistingPermissions(permissionIds) {
        const records = await permissionsModel_1.default.findAll({
            where: { id: permissionIds },
            attributes: ["id"],
        });
        return records.map((r) => r.id);
    }
}
exports.RolePermissionRepository = RolePermissionRepository;
//# sourceMappingURL=rolePermissionRepository.js.map
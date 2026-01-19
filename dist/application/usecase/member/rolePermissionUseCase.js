"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionUseCase = void 0;
const rolePermissionRepository_1 = require("@infrastructure/repositories/member/rolePermissionRepository");
class RolePermissionUseCase {
    constructor() {
        this.rolePermissionRepository = new rolePermissionRepository_1.RolePermissionRepository();
    }
    async getPermissionsByRole(data) {
        // Ambil semua role-permission, sudah return array string (nama permission)
        const permissions = await this.rolePermissionRepository.findByRoleIdAndCompany(data.roleId, data.companyId);
        // Tidak perlu map lagi, langsung return
        return permissions;
    }
    async validatePermissions(permissionIds) {
        // Panggil repository untuk cek permission yang ada
        return await this.rolePermissionRepository.findExistingPermissions(permissionIds);
    }
    async assignPermissionsToRole(data) {
        const { roleId, permissionIds, companyId } = data;
        const created = [];
        // Validasi permissionIds ada di tabel permissions
        const validPermissions = await this.rolePermissionRepository.findExistingPermissions(permissionIds);
        if (validPermissions.length !== permissionIds.length) {
            const invalidIds = permissionIds.filter(id => !validPermissions.includes(id));
            throw new Error(`Permission ID tidak valid: ${invalidIds.join(", ")}`);
        }
        for (const permissionId of permissionIds) {
            const rp = await this.rolePermissionRepository.create({ roleId, permissionId, companyId });
            created.push(rp);
        }
        return created;
    }
    async updatePermissionsForRole(data) {
        const { roleId, permissionIds, companyId } = data;
        // hapus semua yang lama
        await this.rolePermissionRepository.deleteAllByRoleAndCompany(roleId, companyId);
        // insert yang baru
        const created = [];
        for (const permissionId of permissionIds) {
            const rp = await this.rolePermissionRepository.create({ roleId, permissionId, companyId });
            created.push(rp);
        }
        return created;
    }
    async removePermissionFromRole(data) {
        const { roleId, permissionId, companyId } = data;
        const deleted = await this.rolePermissionRepository.deleteByRolePermissionAndCompany(roleId, permissionId, companyId);
        return deleted > 0;
    }
    async removeAllPermissionsFromRole(data) {
        const { roleId, companyId } = data;
        const deleted = await this.rolePermissionRepository.deleteAllByRoleAndCompany(roleId, companyId);
        return deleted > 0;
    }
}
exports.RolePermissionUseCase = RolePermissionUseCase;
//# sourceMappingURL=rolePermissionUseCase.js.map
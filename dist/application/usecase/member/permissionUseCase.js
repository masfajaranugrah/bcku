"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionUseCase = void 0;
const permissionRepository_1 = require("../../../infrastructure/repositories/member/permissionRepository");
class PermissionUseCase {
    constructor() {
        this.permissionsRepository = new permissionRepository_1.PermissionsRepository();
    }
    async createPermission(payload) {
        // Pastikan payload mengandung companyId
        return this.permissionsRepository.create(payload);
    }
    async getPermission(data) {
        const { companyId } = data;
        return this.permissionsRepository.findAll(companyId);
    }
    async getPermissionById(id, companyId) {
        return this.permissionsRepository.findById(id);
    }
    async updatePermission(id, payload) {
        // CompanyId opsional di update
        return this.permissionsRepository.update(id, payload);
    }
    async deletePermission(id, companyId) {
        return this.permissionsRepository.delete(id);
    }
}
exports.PermissionUseCase = PermissionUseCase;
//# sourceMappingURL=permissionUseCase.js.map
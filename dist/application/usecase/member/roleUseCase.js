"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUseCase = void 0;
const roleRepository_1 = require("@infrastructure/repositories/member/roleRepository");
const models_1 = require("@infrastructure/database/models");
class RoleUseCase {
    constructor() {
        this.roleRepository = new roleRepository_1.RoleRepository();
    }
    async createRole(companyId, payload) {
        return this.roleRepository.create(companyId, payload);
    }
    async getRoles(companyId) {
        return this.roleRepository.findAll(companyId);
    }
    async getRoleById(id, companyId) {
        return this.roleRepository.findById(id, companyId);
    }
    async updateRole(id, companyId, payload) {
        return this.roleRepository.update(id, companyId, payload);
    }
    async deleteRole(id, companyId) {
        const userCount = await models_1.UserModel.count({ where: { roleId: id, companyId } });
        if (userCount > 0)
            throw new Error(`Role masih dipakai oleh ${userCount} user, tidak bisa dihapus`);
        return this.roleRepository.delete(id, companyId);
    }
}
exports.RoleUseCase = RoleUseCase;
//# sourceMappingURL=roleUseCase.js.map
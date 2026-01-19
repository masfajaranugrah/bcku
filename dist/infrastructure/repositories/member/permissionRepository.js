"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsRepository = void 0;
const permissionsModel_1 = __importDefault(require("@infrastructure/database/models/member/permissionsModel"));
class PermissionsRepository {
    async create(permissions) {
        const created = await permissionsModel_1.default.create(permissions);
        return created.toJSON();
    }
    async findAll(companyId) {
        const records = await permissionsModel_1.default.findAll({ where: { companyId } });
        return records.map((r) => r.toJSON());
    }
    async findById(id) {
        const role = await permissionsModel_1.default.findByPk(id);
        return role ? role.toJSON() : null;
    }
    async findByIds(ids) {
        const permissions = await permissionsModel_1.default.findAll({ where: { id: ids } });
        return permissions.map((p) => p.toJSON());
    }
    async update(id, payload) {
        const role = await permissionsModel_1.default.findByPk(id);
        if (!role)
            return null;
        await role.update(payload);
        return role.toJSON();
    }
    async delete(id) {
        const deleted = await permissionsModel_1.default.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.PermissionsRepository = PermissionsRepository;
//# sourceMappingURL=permissionRepository.js.map
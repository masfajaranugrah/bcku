"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const rolesModel_1 = __importDefault(require("@infrastructure/database/models/member/rolesModel"));
class RoleRepository {
    // Create role, pastikan role unik per company
    async create(companyId, role) {
        // cek apakah role dengan nama yang sama sudah ada di company ini
        const exists = await rolesModel_1.default.findOne({
            where: { name: role.name, companyId }
        });
        if (exists) {
            return exists.toJSON();
        }
        const created = await rolesModel_1.default.create({ ...role, companyId });
        return created.toJSON();
    }
    // Ambil semua role di sebuah company
    async findAll(companyId) {
        const roles = await rolesModel_1.default.findAll({ where: { companyId } });
        return roles.map((role) => role.toJSON());
    }
    // Ambil role berdasarkan ID dan company
    async findById(id, companyId) {
        const role = await rolesModel_1.default.findOne({ where: { id, companyId } });
        return role ? role.toJSON() : null;
    }
    // Cari role berdasarkan nama dan company (update!)
    async findByName(name) {
        const role = await rolesModel_1.default.findOne({ where: { name } });
        return role ? role.toJSON() : null;
    }
    // Update role dengan companyId
    async update(id, companyId, payload) {
        const role = await this.findById(id, companyId);
        if (!role)
            return null;
        const instance = await rolesModel_1.default.findByPk(id);
        if (!instance)
            return null;
        await instance.update(payload);
        return instance.toJSON();
    }
    // Delete role dengan companyId
    async delete(id, companyId) {
        const deleted = await rolesModel_1.default.destroy({ where: { id, companyId } });
        return deleted > 0;
    }
    // ---------- DEFAULT ROLE HR_ADMIN ----------
    async findByNameAndCompany(roleName, companyId) {
        const role = await rolesModel_1.default.findOne({
            where: {
                name: roleName,
                companyId
            }
        });
        return role ? role.toJSON() : null;
    }
}
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=roleRepository.js.map
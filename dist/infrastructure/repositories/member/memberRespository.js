"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRespository = void 0;
const rolesModel_1 = __importDefault(require("@infrastructure/database/models/member/rolesModel"));
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
const models_1 = require("@infrastructure/database/models");
const rolePermissionModel_1 = __importDefault(require("@infrastructure/database/models/member/rolePermissionModel"));
class MemberRespository {
    async findById(id) {
        const user = await userModel_1.default.findByPk(id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: rolesModel_1.default,
                    as: "role",
                    include: [
                        {
                            model: models_1.PermissionModel,
                            as: "permissions",
                            attributes: ["name"],
                            through: { model: rolePermissionModel_1.default, attributes: [] },
                        },
                    ],
                },
            ],
        });
        if (!user)
            return null;
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isVerified: user.isVerified,
            companyId: user.companyId,
            role: user.role?.name || null,
            permissions: user.role?.permissions.map((p) => p.name) || [],
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async findUserAll(filter = {}) {
        const where = {};
        if (filter.companyId)
            where.companyId = filter.companyId;
        const users = await userModel_1.default.findAll({
            where,
            attributes: { exclude: ["roleId", "password"] },
            include: [
                {
                    model: rolesModel_1.default,
                    as: "role",
                    include: [
                        {
                            model: models_1.PermissionModel,
                            as: "permissions",
                            attributes: ["name"],
                            through: { attributes: [] },
                        },
                    ],
                },
            ],
        });
        return users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role?.name || null,
            permissions: user.role?.permissions.map((p) => p.name) || [],
        }));
    }
    async update(id, data) {
        const user = await userModel_1.default.findByPk(id);
        if (!user)
            throw new Error("User tidak ditemukan");
        // Jika data.roleId ada, tetap update (digunakan admin)
        if (data.roleId) {
            user.set("roleId", data.roleId);
        }
        await user.update(data);
        // Return data formatted
        return this.findById(id);
    }
}
exports.MemberRespository = MemberRespository;
//# sourceMappingURL=memberRespository.js.map
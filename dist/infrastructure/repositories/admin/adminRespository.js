"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRespository = void 0;
const rolesModel_1 = __importDefault(require("@infrastructure/database/models/member/rolesModel"));
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
const models_1 = require("@infrastructure/database/models");
const rolePermissionModel_1 = __importDefault(require("@infrastructure/database/models/member/rolePermissionModel"));
const sequelize_1 = require("sequelize");
class AdminRespository {
    async create(user) {
        const created = await userModel_1.default.create(user);
        return created.toJSON();
    }
    async findByIdAndCompany(id, companyId) {
        return await userModel_1.default.findOne({ where: { id, companyId } });
    }
    async updateByIdAndCompany(id, companyId, data) {
        const member = await this.findByIdAndCompany(id, companyId);
        if (!member)
            throw new Error("Member tidak ditemukan");
        return await member.update(data);
    }
    async deleteByIdAndCompany(id, companyId) {
        const member = await this.findByIdAndCompany(id, companyId);
        if (!member)
            throw new Error("Member tidak ditemukan");
        return await member.destroy();
    }
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
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role?.name || null,
            permissions: user.role?.permissions.map((p) => p.name) || [],
        };
    }
    // async findUserAll(): Promise<any[]> {
    //     const users = await userModel.findAll({
    //         attributes: { exclude: ["roleId", "password"] },
    //         include: [
    //             {
    //                 model: RoleModel,
    //                 as: "role",
    //                 include: [
    //                     {
    //                         model: PermissionModel,
    //                         as: "permissions",
    //                         attributes: ["name"],
    //                         through: { attributes: [] },
    //                     },
    //                 ],
    //             },
    //         ],
    //     });
    //     return users.map((user: any) => ({
    //         id: user.id,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         email: user.email,
    //         isVerified: user.isVerified,
    //         createdAt: user.createdAt,
    //         updatedAt: user.updatedAt,
    //         role: user.role?.name || null,
    //         permissions: user.role?.permissions.map((p: any) => p.name) || [],
    //     }));
    // }
    async findUserAll(companyId) {
        // Jika companyId tidak ada, langsung kembalikan array kosong
        if (!companyId)
            return [];
        const users = await userModel_1.default.findAll({
            where: { companyId }, // filter sesuai perusahaan
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
    async findByEmail(email) {
        const user = await userModel_1.default.findOne({ where: { email } });
        return user ? user.toJSON() : null;
    }
    async update(id, data) {
        const user = await userModel_1.default.findByPk(id);
        if (!user)
            throw new Error("User tidak ditemukan");
        // kalau ada roleId ikut update
        if (data.roleId) {
            user.set("roleId", data.roleId);
        }
        await user.update(data);
        return this.findById(id); // return versi yang sudah formatted
    }
    async delete(id) {
        const user = await userModel_1.default.findByPk(id);
        if (!user)
            throw new Error("User tidak ditemukan");
        await user.destroy();
    }
    async findByToken(token) {
        const user = await userModel_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [sequelize_1.Op.gt]: new Date()
                }
            }
        });
        return user ? user.toJSON() : null;
    }
}
exports.AdminRespository = AdminRespository;
//# sourceMappingURL=adminRespository.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
const sequelize_1 = require("sequelize");
const models_1 = require("@infrastructure/database/models"); // ✅ tambahkan DepartmentModel
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    async hashPassword(password) {
        const salt = await bcrypt_1.default.genSalt(10);
        return bcrypt_1.default.hash(password, salt);
    }
    async create(user) {
        const created = await userModel_1.default.create(user);
        return created.toJSON();
    }
    async findById(id) {
        const user = await userModel_1.default.findByPk(id, {
            include: [
                {
                    model: models_1.RoleModel,
                    as: "role",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.DepartmentModel,
                    as: "department",
                    attributes: ["id", "name"],
                },
            ],
        });
        return user ? user.toJSON() : null;
    }
    async findAll() {
        const users = await userModel_1.default.findAll({
            include: [
                {
                    model: models_1.RoleModel,
                    as: "role",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.DepartmentModel,
                    as: "department",
                    attributes: ["id", "name"],
                },
            ],
        });
        return users.length > 0 ? users.map((u) => u.toJSON()) : null;
    }
    async findByEmail(email) {
        const user = await userModel_1.default.findOne({
            where: { email },
            include: [
                {
                    model: models_1.RoleModel,
                    as: "role",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.DepartmentModel,
                    as: "department",
                    attributes: ["id", "name"], // ✅ include department juga
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
            companyId: user.companyId,
            password: user.password,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            roleId: user.role?.id || null,
            roleName: user.role?.name || null,
            departmentId: user.department?.id || null, // ✅
            departmentName: user.department?.name || null, // ✅
            profilePicture: user.profilePicture ?? null,
            verificationCode: user.verificationCode,
            verificationCodeExpires: user.verificationCodeExpires,
            verificationEmailToken: user.verificationEmailToken,
            verificationEmailTokenExpires: user.verificationEmailTokenExpires,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires,
        };
    }
    async update(id, data) {
        const user = await userModel_1.default.findByPk(id);
        if (!user)
            throw new Error("User tidak ditemukan");
        await user.update(data);
        return user.toJSON();
    }
    async findByToken(token) {
        const user = await userModel_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [sequelize_1.Op.gt]: new Date() },
            },
        });
        return user ? user.toJSON() : null;
    }
    async findByVerificationCode(code) {
        return await userModel_1.default.findOne({ where: { verificationCode: code } });
    }
    async findByVerificationToken(verificationEmailToken) {
        return await userModel_1.default.findOne({ where: { verificationEmailToken } });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map
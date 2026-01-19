"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const companyModal_1 = require("../company/companyModal");
const departmentModel_1 = require("../department/departmentModel");
const UserModel = database_1.default.define("User", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 100] }
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "roles", key: "id" },
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    verificationCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: companyModal_1.CompanyModel,
            key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    },
    // ✅ Tambahan relasi ke department
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: departmentModel_1.DepartmentModel,
            key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    },
    verificationCodeExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    verificationEmailToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verificationEmailTokenExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    resetPasswordToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: "users",
    timestamps: true,
});
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map
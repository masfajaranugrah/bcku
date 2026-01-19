"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const RolePermissionModel = database_1.default.define("role_permissions", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    roleId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "roles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", // lebih aman daripada CASCADE
    },
    permissionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "permissions", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "companies", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
}, {
    tableName: "role_permissions",
    timestamps: false,
    underscored: true, // opsional, tapi konsisten dengan snake_case
});
exports.default = RolePermissionModel;
//# sourceMappingURL=rolePermissionModel.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const companyModal_1 = require("@infrastructure/database/models/company/companyModal");
exports.DepartmentModel = database_1.default.define("Department", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: { model: "companies", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
}, {
    tableName: "departments",
    timestamps: true,
});
// Relasi antar model
exports.DepartmentModel.belongsTo(companyModal_1.CompanyModel, {
    foreignKey: "companyId",
    as: "company",
});
companyModal_1.CompanyModel.hasMany(exports.DepartmentModel, {
    foreignKey: "companyId",
    as: "departments",
});
//# sourceMappingURL=departmentModel.js.map
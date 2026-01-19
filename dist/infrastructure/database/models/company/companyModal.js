"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class CompanyModel extends sequelize_1.Model {
}
exports.CompanyModel = CompanyModel;
// CompanyModel.ts
CompanyModel.init({
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    code: { type: sequelize_1.DataTypes.STRING, allowNull: true, unique: true },
    paketId: { type: sequelize_1.DataTypes.UUID, allowNull: true }, // ⚡ bisa null, no default
    address: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // ⚡ default aktif
}, { sequelize: database_1.default, tableName: "companies", timestamps: true });
exports.default = CompanyModel;
//# sourceMappingURL=companyModal.js.map
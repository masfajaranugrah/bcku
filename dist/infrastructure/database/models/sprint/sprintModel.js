"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const companyModal_1 = require("@infrastructure/database/models/company/companyModal");
class SprintModel extends sequelize_1.Model {
}
SprintModel.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    companyId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    goal: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    startDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    endDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    storyPoints: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    progress: { type: sequelize_1.DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    status: {
        type: sequelize_1.DataTypes.ENUM("PLANNED", "IN_PROGRESS", "DONE"),
        allowNull: false,
        defaultValue: "PLANNED",
    },
    createdBy: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, {
    sequelize: database_1.default,
    tableName: "sprints",
    modelName: "Sprint",
});
SprintModel.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId", as: "company" });
companyModal_1.CompanyModel.hasMany(SprintModel, { foreignKey: "companyId", as: "sprints" });
exports.default = SprintModel;
//# sourceMappingURL=sprintModel.js.map
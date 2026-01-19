"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class KpiModel extends sequelize_1.Model {
}
exports.KpiModel = KpiModel;
KpiModel.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: sequelize_1.DataTypes.UUIDV4, primaryKey: true },
    companyId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    sprintId: { type: sequelize_1.DataTypes.UUID, allowNull: true },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    type: { type: sequelize_1.DataTypes.ENUM('REVENUE', 'PRODUCT', 'ENGAGEMENT', 'OTHER'), defaultValue: 'OTHER' },
    priority: { type: sequelize_1.DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'), defaultValue: 'MEDIUM' },
    target: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    achieved: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    progress: { type: sequelize_1.DataTypes.FLOAT, defaultValue: 0 },
    startDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    endDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED'), defaultValue: 'PLANNED' },
    createdBy: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    updatedBy: { type: sequelize_1.DataTypes.STRING, allowNull: true }
}, {
    sequelize: database_1.default,
    tableName: "kpis",
    timestamps: true,
    hooks: {
        beforeSave: (instance) => {
            if (instance.target && instance.achieved !== undefined) {
                instance.progress = Math.min((instance.achieved / instance.target) * 100, 100);
                if (instance.progress >= 100)
                    instance.status = "COMPLETED";
                else if (instance.progress > 0)
                    instance.status = "IN_PROGRESS";
                else
                    instance.status = "PLANNED";
            }
        }
    }
});
//# sourceMappingURL=kpiModel.js.map
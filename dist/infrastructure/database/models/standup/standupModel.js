"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandupModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class StandupModel extends sequelize_1.Model {
}
exports.StandupModel = StandupModel;
StandupModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    sprintId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    yesterday: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    today: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    blockers: {
        type: sequelize_1.DataTypes.TEXT,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: "standups",
    timestamps: true,
});
//# sourceMappingURL=standupModel.js.map
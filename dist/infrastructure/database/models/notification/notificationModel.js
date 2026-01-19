"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class NotificationModel extends sequelize_1.Model {
}
exports.NotificationModel = NotificationModel;
NotificationModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("info", "success", "warning", "error"),
        defaultValue: "info",
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    tableName: "notifications",
    timestamps: true,
});
//# sourceMappingURL=notificationModel.js.map
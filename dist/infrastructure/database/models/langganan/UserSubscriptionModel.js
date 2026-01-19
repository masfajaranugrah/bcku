"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriptionModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class UserSubscriptionModel extends sequelize_1.Model {
}
exports.UserSubscriptionModel = UserSubscriptionModel;
UserSubscriptionModel.init({
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true, defaultValue: sequelize_1.DataTypes.UUIDV4 },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    packageId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "packages", key: "id" },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "EXPIRED", "PENDING", "CANCELLED"),
        defaultValue: "PENDING",
    },
    startDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    endDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
}, {
    sequelize: database_1.default,
    tableName: "user_subscriptions",
    timestamps: true,
});
//# sourceMappingURL=UserSubscriptionModel.js.map
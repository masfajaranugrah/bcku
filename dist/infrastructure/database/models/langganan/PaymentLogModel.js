"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
const companyModal_1 = __importDefault(require("@infrastructure/database/models/company/companyModal"));
const PaymentLogModel = database_1.default.define("PaymentLog", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: userModel_1.default, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: { model: companyModal_1.default, key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    orderId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    packageId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    duration: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    transactionStatus: { type: sequelize_1.DataTypes.STRING, allowNull: true, defaultValue: "PENDING" },
    customerDetails: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    productDetails: { type: sequelize_1.DataTypes.JSON, allowNull: true },
}, {
    tableName: "PaymentLogs",
    timestamps: true,
});
exports.default = PaymentLogModel;
//# sourceMappingURL=PaymentLogModel.js.map
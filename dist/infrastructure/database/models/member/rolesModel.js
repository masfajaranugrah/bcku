"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const RoleModel = database_1.default.define("Role", {
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "companies",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
}, {
    tableName: "roles",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["name", "companyId"],
        },
    ],
});
exports.default = RoleModel;
//# sourceMappingURL=rolesModel.js.map
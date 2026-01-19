"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
class NoteModel extends sequelize_1.Model {
}
exports.NoteModel = NoteModel;
NoteModel.init({
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
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("todo", "in_progress", "done"),
        defaultValue: "todo",
    },
    color: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: "yellow", // yellow, pink, blue, green
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    tableName: "notes",
    timestamps: true,
});
//# sourceMappingURL=noteModel.js.map
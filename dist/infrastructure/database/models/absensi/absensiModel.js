"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("@config/database"));
const AbsensiModel = database_1.default.define("absensi", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    tanggal: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    waktuMasuk: { type: sequelize_1.DataTypes.TIME, allowNull: true },
    waktuKeluar: { type: sequelize_1.DataTypes.TIME, allowNull: true },
    status_absensi: {
        type: sequelize_1.DataTypes.ENUM("Hadir", "Sakit", "Izin", "Alpha"),
        allowNull: false,
        defaultValue: "Alpha",
    },
    foto: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    keterangan: { type: sequelize_1.DataTypes.TEXT, allowNull: true }, // Catatan/alasan absensi
    latitude: { type: sequelize_1.DataTypes.DECIMAL(10, 7), allowNull: true },
    longitude: { type: sequelize_1.DataTypes.DECIMAL(10, 7), allowNull: true },
    companyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "companies", key: "id" }
    }
}, {
    tableName: "absensi",
    timestamps: true,
});
exports.default = AbsensiModel;
//# sourceMappingURL=absensiModel.js.map
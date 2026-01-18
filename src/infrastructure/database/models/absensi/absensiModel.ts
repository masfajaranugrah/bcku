import { DataTypes } from "sequelize";
import sequelize from "@config/database";

const AbsensiModel = sequelize.define("absensi", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  tanggal: { type: DataTypes.DATEONLY, allowNull: false },
  waktuMasuk: { type: DataTypes.TIME, allowNull: true },
  waktuKeluar: { type: DataTypes.TIME, allowNull: true },
  status_absensi: {
    type: DataTypes.ENUM("Hadir", "Sakit", "Izin", "Alpha"),
    allowNull: false,
    defaultValue: "Alpha",
  },
  foto: { type: DataTypes.STRING, allowNull: true },
  keterangan: { type: DataTypes.TEXT, allowNull: true }, // Catatan/alasan absensi
  latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "companies", key: "id" }
  }
}, {
  tableName: "absensi",
  timestamps: true,
});

export default AbsensiModel;

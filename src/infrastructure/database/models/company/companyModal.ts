import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";

export interface CompanyAttributes {
  id?: string;
  name: string;
  code?: string | null;
  paketId?: string | null; // ⚡ paketId bisa null
  address?: string | null;
  phone?: string | null;
  isActive?: boolean; // ⚡ status aktif/banned
  createdAt?: Date;
  updatedAt?: Date;
}

export class CompanyModel extends Model<CompanyAttributes> implements CompanyAttributes {
  declare id: string;
  declare name: string;
  declare code: string | null;
  declare paketId: string | null;
  declare address: string | null;
  declare phone: string | null;
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

// CompanyModel.ts
CompanyModel.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: true, unique: true },
    paketId: { type: DataTypes.UUID, allowNull: true }, // ⚡ bisa null, no default
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // ⚡ default aktif
  },
  { sequelize, tableName: "companies", timestamps: true }
);






export default CompanyModel;

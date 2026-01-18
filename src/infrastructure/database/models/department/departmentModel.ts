import { DataTypes } from "sequelize";
import sequelize from "@config/database";
import { CompanyModel } from "@infrastructure/database/models/company/companyModal";

export const DepartmentModel = sequelize.define("Department", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: "companies", key: "id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
}, {
  tableName: "departments",
  timestamps: true,
});

// Relasi antar model
DepartmentModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  as: "company",
});
CompanyModel.hasMany(DepartmentModel, {
  foreignKey: "companyId",
  as: "departments",
});

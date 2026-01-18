import { DataTypes } from "sequelize";
import sequelize from "@config/database";

const RolePermissionModel = sequelize.define(
  "role_permissions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "roles", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT", // lebih aman daripada CASCADE
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "permissions", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "companies", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "role_permissions",
    timestamps: false,
    underscored: true, // opsional, tapi konsisten dengan snake_case
  }
);

export default RolePermissionModel;

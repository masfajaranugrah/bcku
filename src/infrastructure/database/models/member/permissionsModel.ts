import { DataTypes } from "sequelize";
import sequelize from "@config/database";

const PermissionModel = sequelize.define("Permission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {  type: DataTypes.STRING, allowNull: false },
  description: {  type: DataTypes.STRING, allowNull: false},
      companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "companies", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
}, {
  tableName: "permissions",
  timestamps: false,
});


export default PermissionModel;

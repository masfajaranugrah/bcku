import { DataTypes } from "sequelize";
import sequelize from "@config/database";

const RoleModel = sequelize.define(
  "Role",
  {
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "companies",  
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT", 
    },
  },
  {
    tableName: "roles",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name", "companyId"], 
      },
    ],
  }
);

export default RoleModel;

import { DataTypes } from "sequelize";
import sequelize from "@config/database";
import UserModel from "@infrastructure/database/models/auth/userModel";
import CompanyModel from "@infrastructure/database/models/company/companyModal";

const PaymentLogModel = sequelize.define(
  "PaymentLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: { 
      type: DataTypes.UUID, 
      allowNull: false,
      references: { model: UserModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    companyId: { 
      type: DataTypes.UUID, 
      allowNull: true,
      references: { model: CompanyModel, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    orderId: { type: DataTypes.STRING, allowNull: false },
    packageId: { type: DataTypes.UUID, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    transactionStatus: { type: DataTypes.STRING, allowNull: true, defaultValue: "PENDING" },
    customerDetails: { type: DataTypes.JSON, allowNull: true },
    productDetails: { type: DataTypes.JSON, allowNull: true },
  },
  {
    tableName: "PaymentLogs",
    timestamps: true,
  }
);

export default PaymentLogModel;

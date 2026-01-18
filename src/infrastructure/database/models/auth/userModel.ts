import { DataTypes } from "sequelize";
import sequelize from "@config/database";
import { CompanyModel } from "../company/companyModal";
import { DepartmentModel } from "../department/departmentModel"; 

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  lastName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    validate: { isEmail: true } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { len: [8, 100] } 
  },
  isVerified: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false, 
    allowNull: false 
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "roles", key: "id" },
  },
  profilePicture: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: CompanyModel,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },

  // ✅ Tambahan relasi ke department
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: DepartmentModel,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },

  verificationCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  verificationEmailToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verificationEmailTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "users",
  timestamps: true,
});

export default UserModel;

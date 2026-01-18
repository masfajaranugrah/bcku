import { CompanyModel } from "@infrastructure/database/models/company/companyModal"; // ✔ perbaiki nama file
import { DepartmentModel } from "@infrastructure/database/models/department/departmentModel";
import UserModel from "@infrastructure/database/models/auth/userModel";
import RoleModel from "@infrastructure/database/models/member/rolesModel";
import PermissionModel from "@infrastructure/database/models/member/permissionsModel";
import RolePermissionModel from "@infrastructure/database/models/member/rolePermissionModel";
import AbsensiModel from "@infrastructure/database/models/absensi/absensiModel";
import PaketModel from "@infrastructure/database/models/paket/PackageModel";
import PaymentLogModel from "./langganan/PaymentLogModel";
import { NotificationModel } from "./notification/notificationModel";
import { NoteModel } from "./note/noteModel";

// COMPANY - PAKET
CompanyModel.belongsTo(PaketModel, { foreignKey: "paketId", as: "paket" });
PaketModel.hasMany(CompanyModel, { foreignKey: "paketId", as: "companies" });

// USER - PAKET
UserModel.belongsTo(PaketModel, { foreignKey: "paketId", as: "userPaket" });
PaketModel.hasMany(UserModel, { foreignKey: "paketId", as: "users" });

// ===================== ROLE - USER =====================
UserModel.belongsTo(RoleModel, { foreignKey: "roleId", as: "role" });
RoleModel.hasMany(UserModel, { foreignKey: "roleId", as: "roleUsers" });

// ===================== COMPANY - USER =====================
UserModel.belongsTo(CompanyModel, { foreignKey: "companyId", as: "company" });
CompanyModel.hasMany(UserModel, { foreignKey: "companyId", as: "companyUsers" });

// ===================== DEPARTMENT - USER =====================
UserModel.belongsTo(DepartmentModel, { foreignKey: "departmentId", as: "department" });
DepartmentModel.hasMany(UserModel, { foreignKey: "departmentId", as: "departmentUsers" });

// ===================== COMPANY - DEPARTMENT =====================
DepartmentModel.belongsTo(CompanyModel, { foreignKey: "companyId", as: "companyForDepartment" });
CompanyModel.hasMany(DepartmentModel, { foreignKey: "companyId", as: "companyDepartments" });

// ===================== ROLE - PERMISSION =====================
RoleModel.belongsToMany(PermissionModel, {
  through: RolePermissionModel,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
});
PermissionModel.belongsToMany(RoleModel, {
  through: RolePermissionModel,
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

// ===================== USER - ABSENSI =====================
UserModel.hasMany(AbsensiModel, { foreignKey: "userId", as: "userAbsensi" });
AbsensiModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });


// UserModel.ts
UserModel.hasMany(PaymentLogModel, { foreignKey: "userId" });
PaymentLogModel.belongsTo(UserModel, { foreignKey: "userId" });

// CompanyModel.ts
CompanyModel.hasMany(PaymentLogModel, { foreignKey: "companyId" });
PaymentLogModel.belongsTo(CompanyModel, { foreignKey: "companyId" });

// ===================== USER/COMPANY - NOTIFICATION =====================
UserModel.hasMany(NotificationModel, { foreignKey: "userId", as: "userNotifications" });
NotificationModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
CompanyModel.hasMany(NotificationModel, { foreignKey: "companyId", as: "companyNotifications" });
NotificationModel.belongsTo(CompanyModel, { foreignKey: "companyId", as: "company" });

// ===================== USER/COMPANY - NOTE =====================
UserModel.hasMany(NoteModel, { foreignKey: "userId", as: "userNotes" });
NoteModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
CompanyModel.hasMany(NoteModel, { foreignKey: "companyId", as: "companyNotes" });
NoteModel.belongsTo(CompanyModel, { foreignKey: "companyId", as: "company" });


export {
  UserModel,
  RoleModel,
  PermissionModel,
  RolePermissionModel,
  CompanyModel,
  DepartmentModel,
  AbsensiModel,
  PaketModel,
  NotificationModel,
  NoteModel,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = exports.NotificationModel = exports.PaketModel = exports.AbsensiModel = exports.DepartmentModel = exports.CompanyModel = exports.RolePermissionModel = exports.PermissionModel = exports.RoleModel = exports.UserModel = void 0;
const companyModal_1 = require("@infrastructure/database/models/company/companyModal"); // ✔ perbaiki nama file
Object.defineProperty(exports, "CompanyModel", { enumerable: true, get: function () { return companyModal_1.CompanyModel; } });
const departmentModel_1 = require("@infrastructure/database/models/department/departmentModel");
Object.defineProperty(exports, "DepartmentModel", { enumerable: true, get: function () { return departmentModel_1.DepartmentModel; } });
const userModel_1 = __importDefault(require("@infrastructure/database/models/auth/userModel"));
exports.UserModel = userModel_1.default;
const rolesModel_1 = __importDefault(require("@infrastructure/database/models/member/rolesModel"));
exports.RoleModel = rolesModel_1.default;
const permissionsModel_1 = __importDefault(require("@infrastructure/database/models/member/permissionsModel"));
exports.PermissionModel = permissionsModel_1.default;
const rolePermissionModel_1 = __importDefault(require("@infrastructure/database/models/member/rolePermissionModel"));
exports.RolePermissionModel = rolePermissionModel_1.default;
const absensiModel_1 = __importDefault(require("@infrastructure/database/models/absensi/absensiModel"));
exports.AbsensiModel = absensiModel_1.default;
const PackageModel_1 = __importDefault(require("@infrastructure/database/models/paket/PackageModel"));
exports.PaketModel = PackageModel_1.default;
const PaymentLogModel_1 = __importDefault(require("./langganan/PaymentLogModel"));
const notificationModel_1 = require("./notification/notificationModel");
Object.defineProperty(exports, "NotificationModel", { enumerable: true, get: function () { return notificationModel_1.NotificationModel; } });
const noteModel_1 = require("./note/noteModel");
Object.defineProperty(exports, "NoteModel", { enumerable: true, get: function () { return noteModel_1.NoteModel; } });
// COMPANY - PAKET
companyModal_1.CompanyModel.belongsTo(PackageModel_1.default, { foreignKey: "paketId", as: "paket" });
PackageModel_1.default.hasMany(companyModal_1.CompanyModel, { foreignKey: "paketId", as: "companies" });
// USER - PAKET
userModel_1.default.belongsTo(PackageModel_1.default, { foreignKey: "paketId", as: "userPaket" });
PackageModel_1.default.hasMany(userModel_1.default, { foreignKey: "paketId", as: "users" });
// ===================== ROLE - USER =====================
userModel_1.default.belongsTo(rolesModel_1.default, { foreignKey: "roleId", as: "role" });
rolesModel_1.default.hasMany(userModel_1.default, { foreignKey: "roleId", as: "roleUsers" });
// ===================== COMPANY - USER =====================
userModel_1.default.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId", as: "company" });
companyModal_1.CompanyModel.hasMany(userModel_1.default, { foreignKey: "companyId", as: "companyUsers" });
// ===================== DEPARTMENT - USER =====================
userModel_1.default.belongsTo(departmentModel_1.DepartmentModel, { foreignKey: "departmentId", as: "department" });
departmentModel_1.DepartmentModel.hasMany(userModel_1.default, { foreignKey: "departmentId", as: "departmentUsers" });
// ===================== COMPANY - DEPARTMENT =====================
departmentModel_1.DepartmentModel.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId", as: "companyForDepartment" });
companyModal_1.CompanyModel.hasMany(departmentModel_1.DepartmentModel, { foreignKey: "companyId", as: "companyDepartments" });
// ===================== ROLE - PERMISSION =====================
rolesModel_1.default.belongsToMany(permissionsModel_1.default, {
    through: rolePermissionModel_1.default,
    foreignKey: "roleId",
    otherKey: "permissionId",
    as: "permissions",
});
permissionsModel_1.default.belongsToMany(rolesModel_1.default, {
    through: rolePermissionModel_1.default,
    foreignKey: "permissionId",
    otherKey: "roleId",
    as: "roles",
});
// ===================== USER - ABSENSI =====================
userModel_1.default.hasMany(absensiModel_1.default, { foreignKey: "userId", as: "userAbsensi" });
absensiModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
// UserModel.ts
userModel_1.default.hasMany(PaymentLogModel_1.default, { foreignKey: "userId" });
PaymentLogModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId" });
// CompanyModel.ts
companyModal_1.CompanyModel.hasMany(PaymentLogModel_1.default, { foreignKey: "companyId" });
PaymentLogModel_1.default.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId" });
// ===================== USER/COMPANY - NOTIFICATION =====================
userModel_1.default.hasMany(notificationModel_1.NotificationModel, { foreignKey: "userId", as: "userNotifications" });
notificationModel_1.NotificationModel.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
companyModal_1.CompanyModel.hasMany(notificationModel_1.NotificationModel, { foreignKey: "companyId", as: "companyNotifications" });
notificationModel_1.NotificationModel.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId", as: "company" });
// ===================== USER/COMPANY - NOTE =====================
userModel_1.default.hasMany(noteModel_1.NoteModel, { foreignKey: "userId", as: "userNotes" });
noteModel_1.NoteModel.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
companyModal_1.CompanyModel.hasMany(noteModel_1.NoteModel, { foreignKey: "companyId", as: "companyNotes" });
noteModel_1.NoteModel.belongsTo(companyModal_1.CompanyModel, { foreignKey: "companyId", as: "company" });
//# sourceMappingURL=index.js.map
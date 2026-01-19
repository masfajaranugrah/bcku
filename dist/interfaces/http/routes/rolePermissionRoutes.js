"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rolePermissionController_1 = require("@interfaces/http/controllers/member/rolePermissionController");
const router = express_1.default.Router();
/**
 * GET /companies/:companyId/roles/:roleId/permissions
 * Ambil semua permissions dari role tertentu
 */
router.get("/:companyId/roles/:roleId/permissions", rolePermissionController_1.RolePermissionController.getPermissionsByRole);
/**
 * POST /companies/:companyId/roles/:roleId/permissions
 * Assign permissions baru ke role (tanpa hapus yang lama)
 */
router.post("/:companyId/roles/:roleId/permissions", rolePermissionController_1.RolePermissionController.assignPermissionsToRole);
/**
 * PUT /companies/:companyId/roles/:roleId/permissions
 * Replace semua permissions untuk role
 */
router.put("/:companyId/roles/:roleId/permissions", rolePermissionController_1.RolePermissionController.updatePermissionsForRole);
/**
 * DELETE /companies/:companyId/roles/:roleId/permissions/:permissionId
 * Hapus satu permission dari role
 */
router.delete("/:companyId/roles/:roleId/permissions/:permissionId", rolePermissionController_1.RolePermissionController.removePermissionFromRole);
/**
 * DELETE /companies/:companyId/roles/:roleId/permissions
 * Hapus semua permissions dari role
 */
router.delete("/:companyId/roles/:roleId/permissions", rolePermissionController_1.RolePermissionController.removeAllPermissionsFromRole);
exports.default = router;
//# sourceMappingURL=rolePermissionRoutes.js.map
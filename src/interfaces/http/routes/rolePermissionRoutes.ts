import express from "express";
import { RolePermissionController } from "@interfaces/http/controllers/member/rolePermissionController";
import { authMiddleware } from '@shared/middleware/authMiddleware';

const router = express.Router();

/**
 * GET /companies/:companyId/roles/:roleId/permissions
 * Ambil semua permissions dari role tertentu
 */
router.get(
  "/:companyId/roles/:roleId/permissions",
  
  RolePermissionController.getPermissionsByRole
);

/**
 * POST /companies/:companyId/roles/:roleId/permissions
 * Assign permissions baru ke role (tanpa hapus yang lama)
 */
router.post(
  "/:companyId/roles/:roleId/permissions",
  
  RolePermissionController.assignPermissionsToRole
);

/**
 * PUT /companies/:companyId/roles/:roleId/permissions
 * Replace semua permissions untuk role
 */
router.put(
  "/:companyId/roles/:roleId/permissions",
  
  RolePermissionController.updatePermissionsForRole
);

/**
 * DELETE /companies/:companyId/roles/:roleId/permissions/:permissionId
 * Hapus satu permission dari role
 */
router.delete(
  "/:companyId/roles/:roleId/permissions/:permissionId",
  
  RolePermissionController.removePermissionFromRole
);

/**
 * DELETE /companies/:companyId/roles/:roleId/permissions
 * Hapus semua permissions dari role
 */
router.delete(
  "/:companyId/roles/:roleId/permissions",
  
  RolePermissionController.removeAllPermissionsFromRole
);

export default router;

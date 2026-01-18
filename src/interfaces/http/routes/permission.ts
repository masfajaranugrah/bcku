import { Router } from "express";
import { permissionController } from "@interfaces/http/controllers/member/permissionController";
 import { authMiddleware, checkFeaturePermission } from "@shared/middleware/authMiddleware";

const router = Router();

// Create permission (companyId wajib di params)
router.post("/:companyId",  authMiddleware,
  checkFeaturePermission("POST_PERMISSION"), permissionController.create);

// Get all permissions by companyId
router.get("/:companyId",  authMiddleware,
  checkFeaturePermission("GET_PERMISSION"), permissionController.findAll);

// Get permission by id & companyId
router.get("/:companyId/:id",  authMiddleware,
  checkFeaturePermission("GET_PERMISSION_ID"), permissionController.findById);

// Update permission by id & companyId
router.put("/:companyId/:id",  authMiddleware,
  checkFeaturePermission("EDIT_PERMISSION"), permissionController.update);

// Delete permission by id & companyId
router.delete("/:companyId/:id",  authMiddleware,
  checkFeaturePermission("DELETE_PERMISSION"), permissionController.delete);

export default router;

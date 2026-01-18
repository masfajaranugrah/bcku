import { Router } from "express";
import { RoleController } from "@interfaces/http/controllers/member/roleController";
import { authMiddleware , checkFeaturePermission} from '@shared/middleware/authMiddleware';

const router = Router();

// Tambahkan companyId di route
router.post("/:companyId", authMiddleware, checkFeaturePermission("POST_ROLE"),  RoleController.create);
router.get("/:companyId", authMiddleware,  RoleController.findAll);
router.get("/:id/:companyId", authMiddleware, RoleController.findById);
router.put("/:id/:companyId",  authMiddleware, checkFeaturePermission("UPDATE_ROLE"), RoleController.update);
router.delete("/:id/:companyId", authMiddleware, checkFeaturePermission("EDIT_ROLE"),  RoleController.delete);

export default router;

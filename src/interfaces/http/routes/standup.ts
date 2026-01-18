import { Router } from "express";
import { StandupController } from "@interfaces/http/controllers/standup/standupController";
import { authMiddleware, checkFeaturePermission } from "@shared/middleware/authMiddleware";

const router = Router();

// Semua endpoint sekarang punya konteks companyId
router.post("/:companyId",authMiddleware,
  checkFeaturePermission("POST_STANDUP"), StandupController.create);
router.get("/:companyId",authMiddleware,
  checkFeaturePermission("GET_STANDUP"), StandupController.getAll);
router.get("/:companyId/detail/:id",authMiddleware,
  checkFeaturePermission("GET_STANDUP_ID"), StandupController.getById);
router.put("/:companyId/:id",authMiddleware,
  checkFeaturePermission("PUT_STANDUP"), StandupController.update);
router.delete("/:companyId/:id",authMiddleware,
  checkFeaturePermission("DELETE_STANDUP"), StandupController.delete);

export default router;

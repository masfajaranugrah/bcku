import { Router } from "express";
import { PackageController } from "@interfaces/http/controllers/paket/PackageController";
import { authMiddleware, checkHrAdminFeature } from "@shared/middleware/authMiddleware";

const router = Router();
const controller = new PackageController();

// All package routes require authentication and HR_ADMIN role
router.post(
  "/packages",
  authMiddleware,
  checkHrAdminFeature("POST_PACKAGE"),
  controller.addPackage.bind(controller)
);

router.put(
  "/packages/:id",
  authMiddleware,
  checkHrAdminFeature("EDIT_PACKAGE"),
  controller.editPackage.bind(controller)
);

router.get(
  "/packages",
  authMiddleware,
  controller.listPackages.bind(controller)
);

router.get(
  "/packages/:id",
  authMiddleware,
  controller.getPackage.bind(controller)
);

router.delete(
  "/packages/:id",
  authMiddleware,
  checkHrAdminFeature("DELETE_PACKAGE"),
  controller.deletePackage.bind(controller)
);

export default router;


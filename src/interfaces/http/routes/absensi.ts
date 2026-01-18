import express from "express";
import { absensiController } from "@interfaces/http/controllers/absensi/absensiController";
import { uploadAbsensi } from "@shared/middleware/uploadMiddleware";
import { authMiddleware, checkFeaturePermission } from "@shared/middleware/authMiddleware";
import { validate } from "@shared/middleware/validation";
import { createAbsensiSchema, companyIdParamSchema } from "@shared/schemas";

const router = express.Router();

// Create absensi - with validation
router.post(
  "/:companyId",
  authMiddleware,
  checkFeaturePermission("POST_ABSENSI"),
  uploadAbsensi.single("foto"),
  validate(createAbsensiSchema),
  absensiController.create
);

// Get all absensi by company
router.get(
  "/:companyId",
  authMiddleware,
  checkFeaturePermission("GET_ABSENSI"),
  validate(companyIdParamSchema, "params"),
  absensiController.getAll
);

// Get absensi by id and company
router.get(
  "/:companyId/:userId",
  authMiddleware,
  checkFeaturePermission("GET_ABSENSI_BY_ID"),
  absensiController.getByUserId
);

// Update absensi
router.put(
  "/:companyId/:id",
  authMiddleware,
  checkFeaturePermission("UPDATE_ABSENSI"),
  uploadAbsensi.single("foto"),
  absensiController.update
);

// Delete absensi
router.delete(
  "/:companyId/:id",
  authMiddleware,
  checkFeaturePermission("DELETE_ABSENSI"),
  absensiController.remove
);

export default router;

import { Router } from "express";
import { SprintController } from "@interfaces/http/controllers/sprint/sprintController";
import { authMiddleware, checkFeaturePermission } from "@shared/middleware/authMiddleware";
import { validate, validateMultiple } from "@shared/middleware/validation";
import { createSprintSchema, updateSprintSchema, companyIdParamSchema, uuidParamSchema } from "@shared/schemas";

const router = Router();

// Create sprint - with validation
router.post(
  "/:companyId",
  authMiddleware,
  checkFeaturePermission("POST_SPRINT"),
  validateMultiple({
    body: createSprintSchema,
    params: companyIdParamSchema,
  }),
  SprintController.create
);

// Get all sprints
router.get(
  "/:companyId",
  authMiddleware,
  checkFeaturePermission("GET_SPRINT"),
  validate(companyIdParamSchema, "params"),
  SprintController.getAll
);

// Get sprint by id
router.get(
  "/detail/:id",
  authMiddleware,
  checkFeaturePermission("GET_SPRINT_ID"),
  validate(uuidParamSchema, "params"),
  SprintController.getById
);

// Update sprint
router.put(
  "/:id",
  authMiddleware,
  checkFeaturePermission("UPDATE_SPRINT"),
  validateMultiple({
    body: updateSprintSchema,
    params: uuidParamSchema,
  }),
  SprintController.update
);

// Delete sprint
router.delete(
  "/:id",
  authMiddleware,
  checkFeaturePermission("DELETE_SPRINT"),
  validate(uuidParamSchema, "params"),
  SprintController.delete
);

export default router;

import { Router } from "express";
import { KpiController } from "@interfaces/http/controllers/kpi_evaluasi/kpiController";
import { authMiddleware, checkFeaturePermission } from "@shared/middleware/authMiddleware";
import { validate, validateMultiple } from "@shared/middleware/validation";
import { createKpiSchema, companyIdParamSchema, uuidParamSchema } from "@shared/schemas";

const router = Router();

// Create KPI - with validation
router.post(
    "/:companyId",
    authMiddleware,
    checkFeaturePermission("POST_KPI"),
    validateMultiple({
        body: createKpiSchema,
        params: companyIdParamSchema,
    }),
    KpiController.create
);

// Get all KPIs
router.get(
    "/:companyId",
    authMiddleware,
    checkFeaturePermission("GET_KPI"),
    validate(companyIdParamSchema, "params"),
    KpiController.getAll
);

// Get KPI by id
router.get(
    "/:companyId/detail/:id",
    authMiddleware,
    checkFeaturePermission("GET_KPI_ID"),
    KpiController.getById
);

// Update KPI
router.put(
    "/:companyId/:id",
    authMiddleware,
    checkFeaturePermission("EDIT_KPI"),
    KpiController.update
);

// Delete KPI
router.delete(
    "/:companyId/:id",
    authMiddleware,
    checkFeaturePermission("DELETE_KPI"),
    KpiController.delete
);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kpiController_1 = require("@interfaces/http/controllers/kpi_evaluasi/kpiController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const validation_1 = require("@shared/middleware/validation");
const schemas_1 = require("@shared/schemas");
const router = (0, express_1.Router)();
// Create KPI - with validation
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_KPI"), (0, validation_1.validateMultiple)({
    body: schemas_1.createKpiSchema,
    params: schemas_1.companyIdParamSchema,
}), kpiController_1.KpiController.create);
// Get all KPIs
router.get("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_KPI"), (0, validation_1.validate)(schemas_1.companyIdParamSchema, "params"), kpiController_1.KpiController.getAll);
// Get KPI by id
router.get("/:companyId/detail/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_KPI_ID"), kpiController_1.KpiController.getById);
// Update KPI
router.put("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("EDIT_KPI"), kpiController_1.KpiController.update);
// Delete KPI
router.delete("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_KPI"), kpiController_1.KpiController.delete);
exports.default = router;
//# sourceMappingURL=kpi_evaluasi.js.map
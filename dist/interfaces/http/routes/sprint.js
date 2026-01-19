"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sprintController_1 = require("@interfaces/http/controllers/sprint/sprintController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const validation_1 = require("@shared/middleware/validation");
const schemas_1 = require("@shared/schemas");
const router = (0, express_1.Router)();
// Create sprint - with validation
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_SPRINT"), (0, validation_1.validateMultiple)({
    body: schemas_1.createSprintSchema,
    params: schemas_1.companyIdParamSchema,
}), sprintController_1.SprintController.create);
// Get all sprints
router.get("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_SPRINT"), (0, validation_1.validate)(schemas_1.companyIdParamSchema, "params"), sprintController_1.SprintController.getAll);
// Get sprint by id
router.get("/detail/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_SPRINT_ID"), (0, validation_1.validate)(schemas_1.uuidParamSchema, "params"), sprintController_1.SprintController.getById);
// Update sprint
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("UPDATE_SPRINT"), (0, validation_1.validateMultiple)({
    body: schemas_1.updateSprintSchema,
    params: schemas_1.uuidParamSchema,
}), sprintController_1.SprintController.update);
// Delete sprint
router.delete("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_SPRINT"), (0, validation_1.validate)(schemas_1.uuidParamSchema, "params"), sprintController_1.SprintController.delete);
exports.default = router;
//# sourceMappingURL=sprint.js.map
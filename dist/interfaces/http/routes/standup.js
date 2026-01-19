"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const standupController_1 = require("@interfaces/http/controllers/standup/standupController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
// Semua endpoint sekarang punya konteks companyId
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_STANDUP"), standupController_1.StandupController.create);
router.get("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_STANDUP"), standupController_1.StandupController.getAll);
router.get("/:companyId/detail/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_STANDUP_ID"), standupController_1.StandupController.getById);
router.put("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("PUT_STANDUP"), standupController_1.StandupController.update);
router.delete("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_STANDUP"), standupController_1.StandupController.delete);
exports.default = router;
//# sourceMappingURL=standup.js.map
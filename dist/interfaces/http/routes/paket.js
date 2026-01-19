"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PackageController_1 = require("@interfaces/http/controllers/paket/PackageController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
const controller = new PackageController_1.PackageController();
// All package routes require authentication and HR_ADMIN role
router.post("/packages", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkHrAdminFeature)("POST_PACKAGE"), controller.addPackage.bind(controller));
router.put("/packages/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkHrAdminFeature)("EDIT_PACKAGE"), controller.editPackage.bind(controller));
router.get("/packages", authMiddleware_1.authMiddleware, controller.listPackages.bind(controller));
router.get("/packages/:id", authMiddleware_1.authMiddleware, controller.getPackage.bind(controller));
router.delete("/packages/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkHrAdminFeature)("DELETE_PACKAGE"), controller.deletePackage.bind(controller));
exports.default = router;
//# sourceMappingURL=paket.js.map
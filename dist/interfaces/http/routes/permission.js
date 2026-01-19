"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissionController_1 = require("@interfaces/http/controllers/member/permissionController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
// Create permission (companyId wajib di params)
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_PERMISSION"), permissionController_1.permissionController.create);
// Get all permissions by companyId
router.get("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_PERMISSION"), permissionController_1.permissionController.findAll);
// Get permission by id & companyId
router.get("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_PERMISSION_ID"), permissionController_1.permissionController.findById);
// Update permission by id & companyId
router.put("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("EDIT_PERMISSION"), permissionController_1.permissionController.update);
// Delete permission by id & companyId
router.delete("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_PERMISSION"), permissionController_1.permissionController.delete);
exports.default = router;
//# sourceMappingURL=permission.js.map
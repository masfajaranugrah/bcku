"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("@interfaces/http/controllers/member/roleController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
// Tambahkan companyId di route
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_ROLE"), roleController_1.RoleController.create);
router.get("/:companyId", authMiddleware_1.authMiddleware, roleController_1.RoleController.findAll);
router.get("/:id/:companyId", authMiddleware_1.authMiddleware, roleController_1.RoleController.findById);
router.put("/:id/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("UPDATE_ROLE"), roleController_1.RoleController.update);
router.delete("/:id/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("EDIT_ROLE"), roleController_1.RoleController.delete);
exports.default = router;
//# sourceMappingURL=role.js.map
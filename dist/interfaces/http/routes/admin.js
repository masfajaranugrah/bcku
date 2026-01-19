"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("@interfaces/http/controllers/admin/adminController");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = express_1.default.Router();
// AdminController  
router.get("/files/:folder/:userId/:filename", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_FOTO"), adminController_1.adminController.getFile);
router.get('/:companyId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_MEMBER"), adminController_1.adminController.getAllMembers);
router.get('/:id/:companyId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_MEMBER_BY_ID"), adminController_1.adminController.getMemberById);
router.put('/:id/:companyId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("EDIT_MEMBER"), adminController_1.adminController.updateMember);
router.delete('/:id/:companyId', authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_MEMBER"), adminController_1.adminController.deleteMember);
exports.default = router;
//# sourceMappingURL=admin.js.map
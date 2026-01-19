"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const absensiController_1 = require("@interfaces/http/controllers/absensi/absensiController");
const uploadMiddleware_1 = require("@shared/middleware/uploadMiddleware");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const validation_1 = require("@shared/middleware/validation");
const schemas_1 = require("@shared/schemas");
const router = express_1.default.Router();
// Create absensi - with validation
router.post("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_ABSENSI"), uploadMiddleware_1.uploadAbsensi.single("foto"), (0, validation_1.validate)(schemas_1.createAbsensiSchema), absensiController_1.absensiController.create);
// Get all absensi by company
router.get("/:companyId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_ABSENSI"), (0, validation_1.validate)(schemas_1.companyIdParamSchema, "params"), absensiController_1.absensiController.getAll);
// Get absensi by id and company
router.get("/:companyId/:userId", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_ABSENSI_BY_ID"), absensiController_1.absensiController.getByUserId);
// Update absensi
router.put("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("UPDATE_ABSENSI"), uploadMiddleware_1.uploadAbsensi.single("foto"), absensiController_1.absensiController.update);
// Delete absensi
router.delete("/:companyId/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_ABSENSI"), absensiController_1.absensiController.remove);
exports.default = router;
//# sourceMappingURL=absensi.js.map
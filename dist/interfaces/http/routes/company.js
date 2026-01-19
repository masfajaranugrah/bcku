"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @interfaces/http/routes/companyRoutes.ts
const express_1 = __importDefault(require("express"));
const companyController_1 = require("@interfaces/http/controllers/company/companyController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = express_1.default.Router();
const companyController = new companyController_1.CompanyController();
router.post("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_COMPANY"), companyController.createCompany);
router.get("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_COMPANY"), companyController.getAllCompanies);
router.get("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_MEMBER_BY_ID"), companyController.getCompanyById);
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("UPDATE_COMPANY"), companyController.updateCompany);
router.patch("/:id/status", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("UPDATE_COMPANY"), companyController.toggleStatus);
router.delete("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_COMPANY"), companyController.deleteCompany);
exports.default = router;
//# sourceMappingURL=company.js.map
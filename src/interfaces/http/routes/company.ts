// @interfaces/http/routes/companyRoutes.ts
import express from "express";
import { CompanyController } from "@interfaces/http/controllers/company/companyController";
import { authMiddleware, checkFeaturePermission } from '@shared/middleware/authMiddleware';

const router = express.Router();
const companyController = new CompanyController();

router.post("/", authMiddleware, checkFeaturePermission("POST_COMPANY"), companyController.createCompany);
router.get("/", authMiddleware, checkFeaturePermission("GET_COMPANY"), companyController.getAllCompanies);
router.get("/:id", authMiddleware, checkFeaturePermission("GET_MEMBER_BY_ID"), companyController.getCompanyById);
router.put("/:id", authMiddleware, checkFeaturePermission("UPDATE_COMPANY"), companyController.updateCompany);
router.patch("/:id/status", authMiddleware, checkFeaturePermission("UPDATE_COMPANY"), companyController.toggleStatus);
router.delete("/:id", authMiddleware, checkFeaturePermission("DELETE_COMPANY"), companyController.deleteCompany);

export default router;

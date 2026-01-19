"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DepartmentController_1 = require("@interfaces/http/controllers/departement/DepartmentController");
// import { authMiddleware } from "@presentation/middlewares/auth";
// import { authorizePermission } from "@presentation/middlewares/permission";
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const router = (0, express_1.Router)();
const controller = new DepartmentController_1.DepartmentController();
// CRUD Department
router.post("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_DEPARTMENT"), controller.create);
router.get("/", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_DEPARTMNET"), controller.findAll);
router.get("/search", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("POST_COMPANY"), controller.search);
router.get("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("GET_DEPARTMENT_ID"), controller.findById);
router.put("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("EDIT_DEPARTMENT"), controller.update);
router.delete("/:id", authMiddleware_1.authMiddleware, (0, authMiddleware_1.checkFeaturePermission)("DELETE_DEPARTMENT"), controller.delete);
// Get department by company
router.get("/company/:companyId", controller.findByCompany);
// Get users by department
router.get("/:id/users", controller.findUsers);
exports.default = router;
//# sourceMappingURL=departement.js.map
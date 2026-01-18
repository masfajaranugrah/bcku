import { Router } from "express";
import { DepartmentController } from "@interfaces/http/controllers/departement/DepartmentController";
// import { authMiddleware } from "@presentation/middlewares/auth";
// import { authorizePermission } from "@presentation/middlewares/permission";
import { authMiddleware, checkFeaturePermission } from '@shared/middleware/authMiddleware';

const router = Router();
const controller = new DepartmentController();

// CRUD Department
router.post("/", authMiddleware, checkFeaturePermission("POST_DEPARTMENT"),  controller.create);
router.get("/",  authMiddleware, checkFeaturePermission("GET_DEPARTMNET"), controller.findAll);
router.get("/search", authMiddleware, checkFeaturePermission("POST_COMPANY"),  controller.search);
router.get("/:id",  authMiddleware, checkFeaturePermission("GET_DEPARTMENT_ID"), controller.findById);
router.put("/:id",  authMiddleware, checkFeaturePermission("EDIT_DEPARTMENT"), controller.update);
router.delete("/:id", authMiddleware, checkFeaturePermission("DELETE_DEPARTMENT"),  controller.delete);

// Get department by company
router.get("/company/:companyId", controller.findByCompany);

// Get users by department
router.get("/:id/users", controller.findUsers);

export default router;

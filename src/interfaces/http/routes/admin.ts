import { adminController } from '@interfaces/http/controllers/admin/adminController';
import express from "express";
import { authMiddleware, checkFeaturePermission } from '@shared/middleware/authMiddleware';
const router = express.Router();

// AdminController  
router.get("/files/:folder/:userId/:filename", authMiddleware, checkFeaturePermission("GET_FOTO"), adminController.getFile);
router.get('/:companyId', authMiddleware, checkFeaturePermission("GET_MEMBER"), adminController.getAllMembers);
router.get('/:id/:companyId', authMiddleware, checkFeaturePermission("GET_MEMBER_BY_ID"), adminController.getMemberById);
router.put('/:id/:companyId', authMiddleware, checkFeaturePermission("EDIT_MEMBER"), adminController.updateMember);
router.delete('/:id/:companyId', authMiddleware, checkFeaturePermission("DELETE_MEMBER"), adminController.deleteMember);


export default router;


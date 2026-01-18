import { memberController } from '@interfaces/http/controllers/member/memberController';
import { authMiddleware } from "@shared/middleware/authMiddleware";
import express from "express";

const router = express.Router();

// Member hanya bisa akses profil sendiri
router.get("/me", authMiddleware, memberController.getMyProfile);
router.put("/me/profile", authMiddleware, memberController.updateMyProfile);

export default router;

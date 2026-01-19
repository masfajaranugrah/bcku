"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memberController_1 = require("@interfaces/http/controllers/member/memberController");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Member hanya bisa akses profil sendiri
router.get("/me", authMiddleware_1.authMiddleware, memberController_1.memberController.getMyProfile);
router.put("/me/profile", authMiddleware_1.authMiddleware, memberController_1.memberController.updateMyProfile);
exports.default = router;
//# sourceMappingURL=member.js.map
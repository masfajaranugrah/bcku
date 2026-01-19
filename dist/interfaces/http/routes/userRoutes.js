"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("@interfaces/http/controllers/auth/authController");
const uploadMiddleware_1 = require("@shared/middleware/uploadMiddleware");
const validation_1 = require("@shared/middleware/validation");
const schemas_1 = require("@shared/schemas");
const router = express_1.default.Router();
// Register company owner
router.post("/register", uploadMiddleware_1.uploadProfile.single("profilePicture"), (0, validation_1.validate)(schemas_1.registerSchema), authController_1.authController.register);
// Register member under company
router.post("/register-member/:companyId", uploadMiddleware_1.uploadProfile.single("profilePicture"), (0, validation_1.validate)(schemas_1.registerMemberSchema), authController_1.authController.registerMember);
// Login
router.post('/login', (0, validation_1.validate)(schemas_1.loginSchema), authController_1.authController.login);
// Email verification
router.post('/verification/:token', authController_1.authController.verification);
// Resend verification code
router.post('/resend-code-verification', (0, validation_1.validate)(schemas_1.requestResetSchema), authController_1.authController.sendCodeVerification);
// Request password reset
router.post('/request-password', (0, validation_1.validate)(schemas_1.requestResetSchema), authController_1.authController.requestResetPassword);
// Reset password with token
router.post('/reset-password/:token', (0, validation_1.validate)(schemas_1.resetPasswordSchema), authController_1.authController.resetPassword);
// Logout
router.post('/logout', authController_1.authController.logout);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
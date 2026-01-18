import express from 'express';
import { authController } from '@interfaces/http/controllers/auth/authController';
import { uploadProfile } from '@shared/middleware/uploadMiddleware';
import { validate } from '@shared/middleware/validation';
import {
  loginSchema,
  registerSchema,
  registerMemberSchema,
  requestResetSchema,
  resetPasswordSchema,
} from '@shared/schemas';

const router = express.Router();

// Register company owner
router.post(
  "/register",
  uploadProfile.single("profilePicture"),
  validate(registerSchema),
  authController.register
);

// Register member under company
router.post(
  "/register-member/:companyId",
  uploadProfile.single("profilePicture"),
  validate(registerMemberSchema),
  authController.registerMember
);

// Login
router.post('/login', validate(loginSchema), authController.login);

// Email verification
router.post('/verification/:token', authController.verification);

// Resend verification code
router.post('/resend-code-verification', validate(requestResetSchema), authController.sendCodeVerification);

// Request password reset
router.post('/request-password', validate(requestResetSchema), authController.requestResetPassword);

// Reset password with token
router.post('/reset-password/:token', validate(resetPasswordSchema), authController.resetPassword);

// Logout
router.post('/logout', authController.logout);

export default router;

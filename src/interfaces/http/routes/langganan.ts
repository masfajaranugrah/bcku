import { Router } from "express";
import { SubscriptionController } from "../controllers/langganan/subscription";
import { authMiddleware } from "@shared/middleware/authMiddleware";
import { validate, validateMultiple } from "@shared/middleware/validation";
import { subscriptionOrderSchema, subscriptionParamsSchema } from "@shared/schemas";

const router = Router();
const subscriptionController = new SubscriptionController();

// Endpoint order dengan companyId & userId di URL
// Protected with authMiddleware + validation
router.post(
  "/subscription/order/:companyId/:userId",
  authMiddleware,
  validateMultiple({
    body: subscriptionOrderSchema,
    params: subscriptionParamsSchema,
  }),
  subscriptionController.createOrder.bind(subscriptionController)
);

// Callback Midtrans - public endpoint but with signature verification in use case
router.post(
  "/subscription/callback",
  subscriptionController.callback.bind(subscriptionController)
);

// Manual verify payment - useful when callback fails
router.post(
  "/subscription/verify/:orderId",
  authMiddleware,
  subscriptionController.verifyPayment.bind(subscriptionController)
);

export default router;



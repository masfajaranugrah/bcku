"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_1 = require("../controllers/langganan/subscription");
const authMiddleware_1 = require("@shared/middleware/authMiddleware");
const validation_1 = require("@shared/middleware/validation");
const schemas_1 = require("@shared/schemas");
const router = (0, express_1.Router)();
const subscriptionController = new subscription_1.SubscriptionController();
// Endpoint order dengan companyId & userId di URL
// Protected with authMiddleware + validation
router.post("/subscription/order/:companyId/:userId", authMiddleware_1.authMiddleware, (0, validation_1.validateMultiple)({
    body: schemas_1.subscriptionOrderSchema,
    params: schemas_1.subscriptionParamsSchema,
}), subscriptionController.createOrder.bind(subscriptionController));
// Callback Midtrans - public endpoint but with signature verification in use case
router.post("/subscription/callback", subscriptionController.callback.bind(subscriptionController));
// Manual verify payment - useful when callback fails
router.post("/subscription/verify/:orderId", authMiddleware_1.authMiddleware, subscriptionController.verifyPayment.bind(subscriptionController));
exports.default = router;
//# sourceMappingURL=langganan.js.map
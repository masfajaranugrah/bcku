import { Router } from "express";
import PaymentLogController from "@interfaces/http/controllers/paymentLog/PaymentLogController";

const router = Router();

router.get("/payment-logs", PaymentLogController.getAll);

export default router;

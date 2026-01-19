"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaymentLogController_1 = __importDefault(require("@interfaces/http/controllers/paymentLog/PaymentLogController"));
const router = (0, express_1.Router)();
router.get("/payment-logs", PaymentLogController_1.default.getAll);
exports.default = router;
//# sourceMappingURL=paymentLog.js.map
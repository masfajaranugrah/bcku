"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentLogRepository_1 = __importDefault(require("@infrastructure/repositories/PaymentLog/PaymentLogRepository"));
const GetPaymentLogsUseCase_1 = __importDefault(require("@application/usecase/paymentLogs/GetPaymentLogsUseCase"));
class PaymentLogController {
    static async getAll(req, res) {
        try {
            const repository = new PaymentLogRepository_1.default();
            const useCase = new GetPaymentLogsUseCase_1.default(repository);
            const logs = await useCase.execute();
            return res.status(200).json({
                success: true,
                data: logs,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to fetch payment logs",
            });
        }
    }
}
exports.default = PaymentLogController;
//# sourceMappingURL=PaymentLogController.js.map
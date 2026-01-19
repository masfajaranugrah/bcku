"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCallbackUseCase = void 0;
const PaymentLogModel_1 = __importDefault(require("@infrastructure/database/models/langganan/PaymentLogModel"));
const models_1 = require("@infrastructure/database/models");
class PaymentCallbackUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(midtransData) {
        const { order_id, transaction_status } = midtransData;
        let status = "PENDING";
        switch (transaction_status) {
            case "settlement":
            case "capture":
                status = "SUCCESS";
                break;
            case "cancel":
            case "deny":
            case "expire":
                status = "FAILED";
                break;
        }
        await this.repo.updatePaymentStatus(order_id, status);
        if (status === "SUCCESS") {
            const paymentLog = await PaymentLogModel_1.default.findOne({ where: { orderId: order_id } });
            if (!paymentLog)
                throw new Error("Payment log not found");
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + paymentLog.duration);
            // 1️⃣ Aktifkan paket user
            await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);
            // 2️⃣ Update paket company sesuai purchase
            if (paymentLog.companyId) {
                await models_1.CompanyModel.update({ paketId: paymentLog.packageId }, { where: { id: paymentLog.companyId } });
            }
        }
        return { status: "OK" };
    }
}
exports.PaymentCallbackUseCase = PaymentCallbackUseCase;
//# sourceMappingURL=PaymentCallbackUseCase.js.map
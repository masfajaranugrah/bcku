"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentLogModel_1 = __importDefault(require("@infrastructure/database/models/langganan/PaymentLogModel"));
class PaymentLogRepository {
    async getAll() {
        try {
            const paymentLogs = await PaymentLogModel_1.default.findAll({
                order: [["createdAt", "DESC"]],
            });
            return paymentLogs;
        }
        catch (error) {
            throw new Error(`Error fetching payment logs: ${error}`);
        }
    }
    async getById(id) {
        try {
            const paymentLog = await PaymentLogModel_1.default.findByPk(id);
            return paymentLog;
        }
        catch (error) {
            throw new Error(`Error fetching payment log by id: ${error}`);
        }
    }
}
exports.default = PaymentLogRepository;
//# sourceMappingURL=PaymentLogRepository.js.map
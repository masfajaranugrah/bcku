"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPaymentLogsUseCase {
    constructor(paymentLogRepo) {
        this.paymentLogRepo = paymentLogRepo;
    }
    async execute() {
        try {
            const logs = await this.paymentLogRepo.getAll();
            return logs;
        }
        catch (error) {
            throw new Error(`Failed to get payment logs: ${error}`);
        }
    }
}
exports.default = GetPaymentLogsUseCase;
//# sourceMappingURL=GetPaymentLogsUseCase.js.map
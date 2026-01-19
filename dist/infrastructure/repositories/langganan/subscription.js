"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
const UserSubscriptionModel_1 = require("@infrastructure/database/models/langganan/UserSubscriptionModel");
const PaymentLogModel_1 = __importDefault(require("@infrastructure/database/models/langganan/PaymentLogModel"));
class SubscriptionRepository {
    async createPaymentLog(data) {
        return PaymentLogModel_1.default.create(data);
    }
    async updatePaymentStatus(orderId, status) {
        return PaymentLogModel_1.default.update({ transactionStatus: status }, { where: { orderId } });
    }
    async activatePackage(userId, packageId, endDate) {
        const existing = await UserSubscriptionModel_1.UserSubscriptionModel.findOne({ where: { userId } });
        if (existing) {
            return existing.update({
                packageId,
                status: "ACTIVE",
                startDate: new Date(),
                endDate,
            });
        }
        return UserSubscriptionModel_1.UserSubscriptionModel.create({
            userId,
            packageId,
            status: "ACTIVE",
            startDate: new Date(),
            endDate,
        });
    }
    async getUserPackage(userId) {
        return UserSubscriptionModel_1.UserSubscriptionModel.findOne({ where: { userId } });
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
//# sourceMappingURL=subscription.js.map
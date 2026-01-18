import { UserSubscriptionModel } from "@infrastructure/database/models/langganan/UserSubscriptionModel";
import PaymentLogModel from "@infrastructure/database/models/langganan/PaymentLogModel";

interface PaymentLogData {
  userId: string;
  companyId: string;
  orderId: string;
  grossAmount: number;
  packageId: string;
  duration: number;
  transactionStatus: string;
  customerDetails?: {
    userId: string;
    companyId: string;
  };
  productDetails?: {
    packageId: string;
    duration: number;
    price: number;
  };
}

export class SubscriptionRepository {
  async createPaymentLog(data: PaymentLogData) {
    return PaymentLogModel.create(data);
  }

  async updatePaymentStatus(orderId: string, status: string) {
    return PaymentLogModel.update(
      { transactionStatus: status },
      { where: { orderId } }
    );
  }

  async activatePackage(userId: string, packageId: string, endDate: Date) {
    const existing = await UserSubscriptionModel.findOne({ where: { userId } });

    if (existing) {
      return existing.update({
        packageId,
        status: "ACTIVE",
        startDate: new Date(),
        endDate,
      });
    }

    return UserSubscriptionModel.create({
      userId,
      packageId,
      status: "ACTIVE",
      startDate: new Date(),
      endDate,
    });
  }

  async getUserPackage(userId: string) {
    return UserSubscriptionModel.findOne({ where: { userId } });
  }
}

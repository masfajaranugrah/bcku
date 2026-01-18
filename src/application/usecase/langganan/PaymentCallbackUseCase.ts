import { SubscriptionRepository } from "@infrastructure/repositories/langganan/subscription";
import PaymentLogModel from "@infrastructure/database/models/langganan/PaymentLogModel";
import { CompanyModel } from "@infrastructure/database/models";

export class PaymentCallbackUseCase {
  constructor(private repo: SubscriptionRepository) {}

  async execute(midtransData: any) {
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
      const paymentLog: any = await PaymentLogModel.findOne({ where: { orderId: order_id } });
      if (!paymentLog) throw new Error("Payment log not found");

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + paymentLog.duration);

      // 1️⃣ Aktifkan paket user
      await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);

      // 2️⃣ Update paket company sesuai purchase
      if (paymentLog.companyId) {
        await CompanyModel.update(
          { paketId: paymentLog.packageId },
          { where: { id: paymentLog.companyId } }
        );
      }
    }

    return { status: "OK" };
  }
}

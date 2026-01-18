import PaymentLogModel from "@infrastructure/database/models/langganan/PaymentLogModel";

export default class PaymentLogRepository {
  async getAll() {
    try {
      const paymentLogs = await PaymentLogModel.findAll({
        order: [["createdAt", "DESC"]],
      });
      return paymentLogs;
    } catch (error) {
      throw new Error(`Error fetching payment logs: ${error}`);
    }
  }

  async getById(id: string) {
    try {
      const paymentLog = await PaymentLogModel.findByPk(id);
      return paymentLog;
    } catch (error) {
      throw new Error(`Error fetching payment log by id: ${error}`);
    }
  }
}

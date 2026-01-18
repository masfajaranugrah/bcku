import PaymentLogRepository from "@infrastructure/repositories/PaymentLog/PaymentLogRepository";

export default class GetPaymentLogsUseCase {
  private paymentLogRepo: PaymentLogRepository;

  constructor(paymentLogRepo: PaymentLogRepository) {
    this.paymentLogRepo = paymentLogRepo;
  }

  async execute() {
    try {
      const logs = await this.paymentLogRepo.getAll();
      return logs;
    } catch (error) {
      throw new Error(`Failed to get payment logs: ${error}`);
    }
  }
}

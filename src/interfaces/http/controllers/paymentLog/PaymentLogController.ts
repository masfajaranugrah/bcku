import { Request, Response } from "express";
import PaymentLogRepository from "@infrastructure/repositories/PaymentLog/PaymentLogRepository";
import GetPaymentLogsUseCase from "@application/usecase/paymentLogs/GetPaymentLogsUseCase";

export default class PaymentLogController {
  static async getAll(req: Request, res: Response) {
    try {
      const repository = new PaymentLogRepository();
      const useCase = new GetPaymentLogsUseCase(repository);

      const logs = await useCase.execute();
      return res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch payment logs",
      });
    }
  }
}

import { Request, Response } from "express";
import { SubscriptionRepository } from "@infrastructure/repositories/langganan/subscription";
import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";
import { CreateSubscriptionUseCase } from "@application/usecase/langganan/CreateSubscriptionUseCase";

export class SubscriptionController {
  private subscriptionRepo = new SubscriptionRepository();
  private packageRepo = new PackageRepository();
  private createSubscriptionUseCase = new CreateSubscriptionUseCase(
    this.subscriptionRepo,
    this.packageRepo
  );

  async createOrder(req: Request, res: Response) {
    const { companyId, userId } = req.params;
    const { packageId, duration } = req.body;

    if (!userId || !companyId) {
      return res.status(400).json({ error: "userId and companyId are required" });
    }

    try {
      const result = await this.createSubscriptionUseCase.execute({
        userId,
        companyId,
        packageId,
        duration,
      });
      res.json(result);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }

  async callback(req: Request, res: Response) {
    try {
      await this.createSubscriptionUseCase.handleCallback(req.body);
      res.json({ status: "success" });
    } catch (err: any) {
      console.error("[CALLBACK ERROR]", err);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }

  // Manual verification endpoint
  async verifyPayment(req: Request, res: Response) {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    try {
      const result = await this.createSubscriptionUseCase.verifyPaymentManual(orderId);
      res.json({
        status: "success",
        message: "Payment verified successfully",
        data: result,
      });
    } catch (err: any) {
      console.error("[VERIFY PAYMENT ERROR]", err);
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }
}


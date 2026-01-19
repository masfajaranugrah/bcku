import { Request, Response } from "express";
export declare class SubscriptionController {
    private subscriptionRepo;
    private packageRepo;
    private createSubscriptionUseCase;
    createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    callback(req: Request, res: Response): Promise<void>;
    verifyPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=subscription.d.ts.map
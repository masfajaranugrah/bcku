import { SubscriptionRepository } from "@infrastructure/repositories/langganan/subscription";
import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";
export interface CreateSubscriptionDTO {
    userId: string;
    companyId: string;
    packageId: string;
    duration: number;
}
export declare class CreateSubscriptionUseCase {
    private repo;
    private packageRepo;
    constructor(repo: SubscriptionRepository, packageRepo: PackageRepository);
    execute(dto: CreateSubscriptionDTO): Promise<{
        status: string;
        redirectUrl: string;
        orderId: string;
        userId: string;
        companyId: string;
        packageId: string;
        duration: number;
        grossAmount: number;
    }>;
    /**
     * Verify Midtrans callback signature
     * Signature = SHA512(order_id + status_code + gross_amount + server_key)
     */
    private verifySignature;
    handleCallback(payload: any): Promise<void>;
    verifyPaymentManual(orderId: string): Promise<{
        orderId: string;
        midtransStatus: any;
        mappedStatus: string;
        paymentLogId: any;
        companyId: any;
        packageId: any;
    }>;
}
//# sourceMappingURL=CreateSubscriptionUseCase.d.ts.map
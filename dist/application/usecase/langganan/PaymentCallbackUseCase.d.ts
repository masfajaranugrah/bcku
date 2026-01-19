import { SubscriptionRepository } from "@infrastructure/repositories/langganan/subscription";
export declare class PaymentCallbackUseCase {
    private repo;
    constructor(repo: SubscriptionRepository);
    execute(midtransData: any): Promise<{
        status: string;
    }>;
}
//# sourceMappingURL=PaymentCallbackUseCase.d.ts.map
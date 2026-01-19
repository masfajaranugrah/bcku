import PaymentLogRepository from "@infrastructure/repositories/PaymentLog/PaymentLogRepository";
export default class GetPaymentLogsUseCase {
    private paymentLogRepo;
    constructor(paymentLogRepo: PaymentLogRepository);
    execute(): Promise<any>;
}
//# sourceMappingURL=GetPaymentLogsUseCase.d.ts.map
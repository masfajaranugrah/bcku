import { UserSubscriptionModel } from "@infrastructure/database/models/langganan/UserSubscriptionModel";
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
export declare class SubscriptionRepository {
    createPaymentLog(data: PaymentLogData): Promise<any>;
    updatePaymentStatus(orderId: string, status: string): Promise<any>;
    activatePackage(userId: string, packageId: string, endDate: Date): Promise<UserSubscriptionModel>;
    getUserPackage(userId: string): Promise<UserSubscriptionModel | null>;
}
export {};
//# sourceMappingURL=subscription.d.ts.map
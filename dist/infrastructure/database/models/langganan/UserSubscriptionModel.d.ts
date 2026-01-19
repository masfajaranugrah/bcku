import { Model } from "sequelize";
export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "PENDING" | "CANCELLED";
export interface UserSubscriptionAttributes {
    id?: string;
    userId: string;
    packageId: string;
    status: SubscriptionStatus;
    startDate?: Date | null;
    endDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class UserSubscriptionModel extends Model<UserSubscriptionAttributes> implements UserSubscriptionAttributes {
    id: string;
    userId: string;
    packageId: string;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=UserSubscriptionModel.d.ts.map
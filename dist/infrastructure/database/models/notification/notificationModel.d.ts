import { Model, Optional } from "sequelize";
interface NotificationAttributes {
    id: string;
    userId: string;
    companyId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
interface NotificationCreationAttributes extends Optional<NotificationAttributes, "id" | "read"> {
}
export declare class NotificationModel extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    id: string;
    userId: string;
    companyId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
//# sourceMappingURL=notificationModel.d.ts.map
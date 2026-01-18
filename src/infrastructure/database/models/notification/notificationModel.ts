import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";

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

interface NotificationCreationAttributes extends Optional<NotificationAttributes, "id" | "read"> { }

export class NotificationModel
    extends Model<NotificationAttributes, NotificationCreationAttributes>
    implements NotificationAttributes {
    public id!: string;
    public userId!: string;
    public companyId!: string;
    public title!: string;
    public message!: string;
    public type!: "info" | "success" | "warning" | "error";
    public read!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

NotificationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("info", "success", "warning", "error"),
            defaultValue: "info",
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: "notifications",
        timestamps: true,
    }
);

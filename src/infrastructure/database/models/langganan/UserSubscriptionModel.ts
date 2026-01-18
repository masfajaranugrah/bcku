import { Model, DataTypes } from "sequelize";
import sequelize from "@config/database";

export type SubscriptionStatus =
  "ACTIVE" | "EXPIRED" | "PENDING" | "CANCELLED";

export interface UserSubscriptionAttributes {
  id?: string;
  userId: string;
  packageId: string; // menggunakan packageId
  status: SubscriptionStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserSubscriptionModel
  extends Model<UserSubscriptionAttributes>
  implements UserSubscriptionAttributes
{
  declare id: string;
  declare userId: string;
  declare packageId: string;
  declare status: SubscriptionStatus;
  declare startDate: Date;
  declare endDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserSubscriptionModel.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

    userId: { type: DataTypes.UUID, allowNull: false },

    packageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "packages", key: "id" },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "EXPIRED", "PENDING", "CANCELLED"),
      defaultValue: "PENDING",
    },

    startDate: { type: DataTypes.DATE, allowNull: true },

    endDate: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "user_subscriptions",
    timestamps: true,
  }
);

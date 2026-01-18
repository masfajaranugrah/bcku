import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";

interface StandupAttributes {
  id: string;
  companyId: string;
  sprintId?: string;
  userId: string;
  yesterday: string;
  today: string;
  blockers?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StandupCreationAttributes extends Optional<StandupAttributes, "id"> {}

export class StandupModel
  extends Model<StandupAttributes, StandupCreationAttributes>
  implements StandupAttributes
{
  public id!: string;
  public companyId!: string;
  public sprintId?: string;
  public userId!: string;
  public yesterday!: string;
  public today!: string;
  public blockers?: string;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StandupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sprintId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    yesterday: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    today: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blockers: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "standups",
    timestamps: true,
  }
);

import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";

export class KpiModel extends Model {
  declare id: string;
  declare companyId: string;
  declare sprintId?: string;
  declare userId: string;
  declare title: string;
  declare description?: string;
  declare type?: "REVENUE" | "PRODUCT" | "ENGAGEMENT" | "OTHER";
  declare priority?: "LOW" | "MEDIUM" | "HIGH";
  declare target: number;
  declare achieved: number;
  declare progress: number;
  declare startDate?: Date;
  declare endDate?: Date;
  declare date?: string;
  declare status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
  declare createdBy: string;
  declare updatedBy?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

KpiModel.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  companyId: { type: DataTypes.UUID, allowNull: false },
  sprintId: { type: DataTypes.UUID, allowNull: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  type: { type: DataTypes.ENUM('REVENUE','PRODUCT','ENGAGEMENT','OTHER'), defaultValue: 'OTHER' },
  priority: { type: DataTypes.ENUM('LOW','MEDIUM','HIGH'), defaultValue: 'MEDIUM' },
  target: { type: DataTypes.FLOAT, allowNull: false },
  achieved: { type: DataTypes.FLOAT, defaultValue: 0 },
  progress: { type: DataTypes.FLOAT, defaultValue: 0 },
  startDate: { type: DataTypes.DATE, allowNull: true },
  endDate: { type: DataTypes.DATE, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: true },
  status: { type: DataTypes.ENUM('PLANNED','IN_PROGRESS','COMPLETED'), defaultValue: 'PLANNED' },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  updatedBy: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize,
  tableName: "kpis",
  timestamps: true,
  hooks: {
    beforeSave: (instance: KpiModel) => {
      if (instance.target && instance.achieved !== undefined) {
        instance.progress = Math.min((instance.achieved / instance.target) * 100, 100);

        if (instance.progress >= 100) instance.status = "COMPLETED";
        else if (instance.progress > 0) instance.status = "IN_PROGRESS";
        else instance.status = "PLANNED";
      }
    }
  }
});

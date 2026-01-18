import { DataTypes, Model } from "sequelize";
import sequelize from "@config/database";
import { CompanyModel } from "@infrastructure/database/models/company/companyModal";

class SprintModel extends Model {}

SprintModel.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    companyId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    goal: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },

    storyPoints: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    progress: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },

    status: {
      type: DataTypes.ENUM("PLANNED", "IN_PROGRESS", "DONE"),
      allowNull: false,
      defaultValue: "PLANNED",
    },

    createdBy: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    tableName: "sprints",
    modelName: "Sprint",
  }
);


SprintModel.belongsTo(CompanyModel, { foreignKey: "companyId", as: "company" });
CompanyModel.hasMany(SprintModel, { foreignKey: "companyId", as: "sprints" });

export default SprintModel;

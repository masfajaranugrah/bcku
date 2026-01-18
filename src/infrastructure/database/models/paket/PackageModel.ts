import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@config/database";

interface PackageAttributes {
  id: string;
  name: string;
  features: string[];
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ID opsional saat create
interface PackageCreationAttributes extends Optional<PackageAttributes, "id"> {}

class PackageModel extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public id!: string;
  public name!: string;
  public features!: string[];
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PackageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "packages",
    timestamps: true,
  }
);

export default PackageModel;

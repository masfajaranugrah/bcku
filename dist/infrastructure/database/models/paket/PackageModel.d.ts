import { Model, Optional } from "sequelize";
interface PackageAttributes {
    id: string;
    name: string;
    features: string[];
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface PackageCreationAttributes extends Optional<PackageAttributes, "id"> {
}
declare class PackageModel extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
    id: string;
    name: string;
    features: string[];
    price: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default PackageModel;
//# sourceMappingURL=PackageModel.d.ts.map
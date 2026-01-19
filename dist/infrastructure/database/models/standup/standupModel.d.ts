import { Model, Optional } from "sequelize";
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
interface StandupCreationAttributes extends Optional<StandupAttributes, "id"> {
}
export declare class StandupModel extends Model<StandupAttributes, StandupCreationAttributes> implements StandupAttributes {
    id: string;
    companyId: string;
    sprintId?: string;
    userId: string;
    yesterday: string;
    today: string;
    blockers?: string;
    date: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
//# sourceMappingURL=standupModel.d.ts.map
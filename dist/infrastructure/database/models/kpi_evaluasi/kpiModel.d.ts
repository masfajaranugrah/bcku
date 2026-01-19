import { Model } from "sequelize";
export declare class KpiModel extends Model {
    id: string;
    companyId: string;
    sprintId?: string;
    userId: string;
    title: string;
    description?: string;
    type?: "REVENUE" | "PRODUCT" | "ENGAGEMENT" | "OTHER";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    target: number;
    achieved: number;
    progress: number;
    startDate?: Date;
    endDate?: Date;
    date?: string;
    status: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
    createdBy: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=kpiModel.d.ts.map
export interface CreateKpiDTO {
    companyId: string;
    sprintId?: string;
    userId: string;
    title: string;
    description?: string;
    type?: "REVENUE" | "PRODUCT" | "ENGAGEMENT" | "OTHER";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    target: number;
    achieved?: number;
    date?: string;
    status?: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
    createdBy: string;
}
export interface UpdateKpiDTO {
    title?: string;
    description?: string;
    type?: "REVENUE" | "PRODUCT" | "ENGAGEMENT" | "OTHER";
    priority?: "LOW" | "MEDIUM" | "HIGH";
    target?: number;
    achieved?: number;
    startDate?: Date;
    endDate?: Date;
    date?: string;
    sprintId?: string;
    status?: "PLANNED" | "IN_PROGRESS" | "COMPLETED";
    updatedBy?: string;
}
export interface KpiAttributes {
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
//# sourceMappingURL=KpiDTO.d.ts.map
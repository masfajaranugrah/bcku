import { CreateKpiDTO, UpdateKpiDTO } from "@application/dtos/KpiDTO";
export declare class KpiUseCase {
    private repository;
    constructor();
    createKpi(data: CreateKpiDTO): Promise<import("../../../infrastructure/database/models/kpi_evaluasi/kpiModel").KpiModel>;
    getAllKpis(companyId: string): Promise<import("../../../infrastructure/database/models/kpi_evaluasi/kpiModel").KpiModel[]>;
    getKpiById(id: string): Promise<import("../../../infrastructure/database/models/kpi_evaluasi/kpiModel").KpiModel | null>;
    updateKpi(id: string, data: UpdateKpiDTO): Promise<import("../../../infrastructure/database/models/kpi_evaluasi/kpiModel").KpiModel | null>;
    deleteKpi(id: string): Promise<number>;
}
//# sourceMappingURL=kpiUseCase.d.ts.map
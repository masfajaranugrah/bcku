import { KpiModel } from "@infrastructure/database/models/kpi_evaluasi/kpiModel";
import { CreateKpiDTO, UpdateKpiDTO } from "@application/dtos/KpiDTO";
export declare class KpiRepository {
    create(data: CreateKpiDTO): Promise<KpiModel>;
    findAllByCompany(companyId: string): Promise<KpiModel[]>;
    findById(id: string): Promise<KpiModel | null>;
    update(id: string, data: UpdateKpiDTO): Promise<KpiModel | null>;
    delete(id: string): Promise<number>;
}
//# sourceMappingURL=kpiRepository.d.ts.map
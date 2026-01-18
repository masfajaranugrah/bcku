import { KpiModel } from "@infrastructure/database/models/kpi_evaluasi/kpiModel";
import { CreateKpiDTO, UpdateKpiDTO } from "@application/dtos/KpiDTO";
 
export class KpiRepository {

    async create(data: CreateKpiDTO) {
  const kpiData = {
    ...data,
    achieved: data.achieved ?? 0,
    progress: 0,
    status: data.status ?? "PLANNED"
  };

  return await KpiModel.create(kpiData);
}


  async findAllByCompany(companyId: string) {
    return await KpiModel.findAll({ where: { companyId } });
  }

  async findById(id: string) {
    return await KpiModel.findByPk(id);
  }

  async update(id: string, data: UpdateKpiDTO) {
    const kpi = await KpiModel.findByPk(id);
    if (!kpi) return null;
    return await kpi.update(data);
  }

  async delete(id: string) {
    return await KpiModel.destroy({ where: { id } });
  }
}

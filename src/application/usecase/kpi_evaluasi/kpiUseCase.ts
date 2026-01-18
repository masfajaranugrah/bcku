import { KpiRepository } from "@infrastructure/repositories/kpi_evaluasi/kpiRepository";
import { CreateKpiDTO, UpdateKpiDTO } from "@application/dtos/KpiDTO";

export class KpiUseCase {
  private repository: KpiRepository;

  constructor() {
    this.repository = new KpiRepository();
  }

  async createKpi(data: CreateKpiDTO) {
    return await this.repository.create(data);
  }

  async getAllKpis(companyId: string) {
    return await this.repository.findAllByCompany(companyId);
  }

  async getKpiById(id: string) {
    return await this.repository.findById(id);
  }

  async updateKpi(id: string, data: UpdateKpiDTO) {
    return await this.repository.update(id, data);
  }

  async deleteKpi(id: string) {
    return await this.repository.delete(id);
  }
}

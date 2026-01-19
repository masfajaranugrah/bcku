"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiUseCase = void 0;
const kpiRepository_1 = require("@infrastructure/repositories/kpi_evaluasi/kpiRepository");
class KpiUseCase {
    constructor() {
        this.repository = new kpiRepository_1.KpiRepository();
    }
    async createKpi(data) {
        return await this.repository.create(data);
    }
    async getAllKpis(companyId) {
        return await this.repository.findAllByCompany(companyId);
    }
    async getKpiById(id) {
        return await this.repository.findById(id);
    }
    async updateKpi(id, data) {
        return await this.repository.update(id, data);
    }
    async deleteKpi(id) {
        return await this.repository.delete(id);
    }
}
exports.KpiUseCase = KpiUseCase;
//# sourceMappingURL=kpiUseCase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiRepository = void 0;
const kpiModel_1 = require("@infrastructure/database/models/kpi_evaluasi/kpiModel");
class KpiRepository {
    async create(data) {
        const kpiData = {
            ...data,
            achieved: data.achieved ?? 0,
            progress: 0,
            status: data.status ?? "PLANNED"
        };
        return await kpiModel_1.KpiModel.create(kpiData);
    }
    async findAllByCompany(companyId) {
        return await kpiModel_1.KpiModel.findAll({ where: { companyId } });
    }
    async findById(id) {
        return await kpiModel_1.KpiModel.findByPk(id);
    }
    async update(id, data) {
        const kpi = await kpiModel_1.KpiModel.findByPk(id);
        if (!kpi)
            return null;
        return await kpi.update(data);
    }
    async delete(id) {
        return await kpiModel_1.KpiModel.destroy({ where: { id } });
    }
}
exports.KpiRepository = KpiRepository;
//# sourceMappingURL=kpiRepository.js.map
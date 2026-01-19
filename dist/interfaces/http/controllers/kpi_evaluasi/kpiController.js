"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiController = void 0;
const kpiUseCase_1 = require("@application/usecase/kpi_evaluasi/kpiUseCase");
const useCase = new kpiUseCase_1.KpiUseCase();
class KpiController {
    static async create(req, res) {
        try {
            const { companyId } = req.params;
            // Ambil userId dari token JWT
            const userId = req.user?.id;
            if (!companyId) {
                return res.status(400).json({ message: "companyId is required" });
            }
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: userId tidak ditemukan dari token" });
            }
            const payload = {
                ...req.body,
                companyId,
                userId, // Dari token
                createdBy: userId, // Dari token
            };
            const result = await useCase.createKpi(payload);
            res.status(201).json(result);
        }
        catch (error) {
            console.error("❌ Create KPI failed:", error);
            res.status(500).json({
                message: "Failed to create KPI",
                error: error.message
            });
        }
    }
    static async getAll(req, res) {
        try {
            const companyId = req.params.companyId;
            if (!companyId) {
                return res.status(400).json({ message: "companyId is required" });
            }
            const kpis = await useCase.getAllKpis(companyId);
            res.json(kpis);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to get KPIs" });
        }
    }
    static async getById(req, res) {
        try {
            const { companyId, id } = req.params;
            const kpi = await useCase.getKpiById(id);
            if (!kpi || kpi.companyId !== companyId)
                return res.status(404).json({ message: "Not found" });
            res.json(kpi);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to get KPI" });
        }
    }
    static async update(req, res) {
        try {
            const { companyId, id } = req.params;
            const kpi = await useCase.getKpiById(id);
            if (!kpi || kpi.companyId !== companyId)
                return res.status(404).json({ message: "Not found" });
            const updated = await useCase.updateKpi(id, req.body);
            res.json(updated);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to update KPI" });
        }
    }
    static async delete(req, res) {
        try {
            const { companyId, id } = req.params;
            const kpi = await useCase.getKpiById(id);
            if (!kpi || kpi.companyId !== companyId)
                return res.status(404).json({ message: "Not found" });
            await useCase.deleteKpi(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete KPI" });
        }
    }
}
exports.KpiController = KpiController;
//# sourceMappingURL=kpiController.js.map
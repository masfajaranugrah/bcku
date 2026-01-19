"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsensiUseCase = void 0;
const absensiRepository_1 = require("@infrastructure/repositories/absensi/absensiRepository");
const AppError_1 = require("@shared/errors/AppError");
class AbsensiUseCase {
    constructor() {
        this.repository = new absensiRepository_1.AbsensiRepository();
    }
    async createAbsensi(data) {
        const existing = await this.repository.findByUserAndDate(data.userId, data.tanggal, data.companyId);
        if (existing)
            throw new AppError_1.AppError("Absensi untuk hari ini sudah ada", 400);
        return await this.repository.createAbsensi(data);
    }
    async getAbsensiByUserId(userId, companyId) {
        if (!companyId)
            throw new AppError_1.AppError("companyId harus diberikan", 400);
        const absensi = await this.repository.findById(userId, companyId);
        if (!absensi || absensi.length === 0)
            throw new AppError_1.AppError("Data absensi tidak ditemukan", 404);
        return absensi;
    }
    async getAllAbsensi(companyId) {
        return await this.repository.getAllAbsensi(companyId);
    }
    async updateAbsensi(id, data, companyId) {
        if (!companyId)
            throw new AppError_1.AppError("companyId harus diberikan", 400);
        const absensi = await this.repository.update(id, data, companyId);
        return absensi;
    }
    async deleteAbsensi(id, companyId) {
        if (!companyId)
            throw new AppError_1.AppError("companyId harus diberikan", 400);
        const existing = await this.repository.findById(id, companyId);
        if (!existing)
            throw new AppError_1.AppError("Data absensi tidak ditemukan", 404);
        return await this.repository.deleteAbsensi(id, companyId);
    }
}
exports.AbsensiUseCase = AbsensiUseCase;
//# sourceMappingURL=absensiUseCase.js.map
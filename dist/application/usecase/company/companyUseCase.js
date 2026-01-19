"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyUseCase = void 0;
const companyRepository_1 = require("@infrastructure/repositories/company/companyRepository");
const AppError_1 = require("@shared/errors/AppError");
class CompanyUseCase {
    constructor() {
        this.repository = new companyRepository_1.CompanyRepository();
    }
    async createCompany(data) {
        // Bisa tambahkan validasi nama unik
        const existing = await this.repository.findByName(data.name);
        if (existing)
            throw new AppError_1.AppError("Company dengan nama ini sudah ada", 400);
        return await this.repository.create(data);
    }
    async getCompanyById(id) {
        const company = await this.repository.findById(id);
        if (!company)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        return company;
    }
    async getAllCompanies() {
        return await this.repository.getAllCompanies();
    }
    async updateCompany(id, data) {
        const existing = await this.repository.findById(id);
        if (!existing)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        return await this.repository.updateCompany(id, data);
    }
    async deleteCompany(id) {
        const existing = await this.repository.findById(id);
        if (!existing)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        return await this.repository.deleteCompany(id);
    }
    // Toggle status aktif company (ban/unban)
    async toggleStatus(id, isActive) {
        const existing = await this.repository.findById(id);
        if (!existing)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        return await this.repository.updateCompany(id, { isActive });
    }
}
exports.CompanyUseCase = CompanyUseCase;
//# sourceMappingURL=companyUseCase.js.map
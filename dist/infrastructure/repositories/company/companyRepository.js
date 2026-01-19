"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const companyModal_1 = require("@infrastructure/database/models/company/companyModal");
const AppError_1 = require("@shared/errors/AppError");
class CompanyRepository {
    /** Cari company berdasarkan nama */
    async findByName(name) {
        return companyModal_1.CompanyModel.findOne({ where: { name } });
    }
    /** Cari company berdasarkan ID */
    async findById(id) {
        return companyModal_1.CompanyModel.findByPk(id);
    }
    /** Ambil semua company */
    async getAllCompanies() {
        return companyModal_1.CompanyModel.findAll();
    }
    /** Buat company baru */
    async create(data) {
        const payload = {
            name: data.name,
            code: data.code ?? null,
            paketId: data.paketId ?? "427a8445-8bbf-4cc8-90bd-bfbb7d3580fb", // default paketId
            address: data.address ?? null,
            phone: data.phone ?? null,
        };
        return companyModal_1.CompanyModel.create(payload);
    }
    /** Perbarui company berdasarkan ID */
    async updateCompany(id, data) {
        const company = await this.findById(id);
        if (!company)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        await company.update({
            name: data.name ?? company.name,
            code: data.code ?? company.code,
            paketId: data.paketId ?? company.paketId,
            address: data.address ?? company.address,
            phone: data.phone ?? company.phone,
            isActive: data.isActive !== undefined ? data.isActive : company.isActive,
        });
        return company;
    }
    /** Hapus company berdasarkan ID */
    async deleteCompany(id) {
        const company = await this.findById(id);
        if (!company)
            throw new AppError_1.AppError("Company tidak ditemukan", 404);
        await company.destroy();
        return company;
    }
    /** Cari company berdasarkan nama, jika tidak ada buat baru */
    async createIfNotExists(data) {
        let company = await this.findByName(data.name);
        if (!company) {
            company = await this.create(data);
        }
        return company;
    }
}
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=companyRepository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const companyUseCase_1 = require("@application/usecase/company/companyUseCase");
const AppError_1 = require("@shared/errors/AppError");
class CompanyController {
    constructor() {
        this.useCase = new companyUseCase_1.CompanyUseCase();
        // Bind methods agar bisa langsung dipakai di router
        this.createCompany = this.createCompany.bind(this);
        this.getAllCompanies = this.getAllCompanies.bind(this);
        this.getCompanyById = this.getCompanyById.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }
    // Buat company baru
    async createCompany(req, res) {
        try {
            const data = req.body;
            // Validasi input sederhana
            if (!data.name) {
                throw new AppError_1.AppError("Nama company wajib diisi", 400);
            }
            const company = await this.useCase.createCompany(data);
            return res.status(201).json({
                message: "Company berhasil dibuat",
                data: company,
            });
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Ambil semua company
    async getAllCompanies(req, res) {
        try {
            const companies = await this.useCase.getAllCompanies();
            return res.status(200).json(companies);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Ambil company berdasarkan ID
    async getCompanyById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new AppError_1.AppError("ID company wajib diisi", 400);
            }
            const company = await this.useCase.getCompanyById(id);
            return res.status(200).json(company);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Update company
    async updateCompany(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                throw new AppError_1.AppError("ID company wajib diisi", 400);
            }
            const updated = await this.useCase.updateCompany(id, data);
            return res.status(200).json({
                message: "Company berhasil diperbarui",
                data: updated,
            });
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Hapus company
    async deleteCompany(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new AppError_1.AppError("ID company wajib diisi", 400);
            }
            const deleted = await this.useCase.deleteCompany(id);
            return res.status(200).json({
                message: "Company berhasil dihapus",
                data: deleted,
            });
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    // Toggle status aktif company (ban/unban)
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { isActive } = req.body;
            if (!id) {
                throw new AppError_1.AppError("ID company wajib diisi", 400);
            }
            if (typeof isActive !== "boolean") {
                throw new AppError_1.AppError("isActive harus berupa boolean (true/false)", 400);
            }
            const updated = await this.useCase.toggleStatus(id, isActive);
            return res.status(200).json({
                message: isActive ? "Company berhasil diaktifkan" : "Company berhasil dinonaktifkan (banned)",
                data: updated,
            });
        }
        catch (err) {
            if (err instanceof AppError_1.AppError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=companyController.js.map
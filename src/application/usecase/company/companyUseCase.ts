import { CompanyRepository } from "@infrastructure/repositories/company/companyRepository";
import { CreateCompanyDTO, UpdateCompanyDTO } from "@application/dtos/CompanyDTO";
import { AppError } from "@shared/errors/AppError";

export class CompanyUseCase {
  private repository: CompanyRepository;

  constructor() {
    this.repository = new CompanyRepository();
  }

  async createCompany(data: CreateCompanyDTO) {
    // Bisa tambahkan validasi nama unik
    const existing = await this.repository.findByName(data.name);
    if (existing) throw new AppError("Company dengan nama ini sudah ada", 400);

    return await this.repository.create(data);
  }

  async getCompanyById(id: string) {
    const company = await this.repository.findById(id);
    if (!company) throw new AppError("Company tidak ditemukan", 404);
    return company;
  }

  async getAllCompanies() {
    return await this.repository.getAllCompanies();
  }

  async updateCompany(id: string, data: UpdateCompanyDTO) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new AppError("Company tidak ditemukan", 404);

    return await this.repository.updateCompany(id, data);
  }

  async deleteCompany(id: string) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new AppError("Company tidak ditemukan", 404);

    return await this.repository.deleteCompany(id);
  }

  // Toggle status aktif company (ban/unban)
  async toggleStatus(id: string, isActive: boolean) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new AppError("Company tidak ditemukan", 404);

    return await this.repository.updateCompany(id, { isActive });
  }
}

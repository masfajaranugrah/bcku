import { CreateCompanyDTO } from '@application/dtos/CompanyDTO';
import { CompanyModel } from "@infrastructure/database/models/company/companyModal";
import { AppError } from "@shared/errors/AppError";

export interface CompanyCreateDTO {
  name: string;
  code?: string | null;
  paketId?: string | null;
  address?: string | null;
  phone?: string | null;
}

export interface CompanyUpdateDTO {
  name?: string;
  code?: string | null;
  paketId?: string | null;
  address?: string | null;
  phone?: string | null;
  isActive?: boolean;
}

export class CompanyRepository {
  /** Cari company berdasarkan nama */
  async findByName(name: string) {
    return CompanyModel.findOne({ where: { name } });
  }

  /** Cari company berdasarkan ID */
  async findById(id: string) {
    return CompanyModel.findByPk(id);
  }

  /** Ambil semua company */
  async getAllCompanies() {
    return CompanyModel.findAll();
  }

  /** Buat company baru */
  async create(data: CreateCompanyDTO) {
    const payload = {
      name: data.name,
      code: data.code ?? null,
      paketId: data.paketId ?? "427a8445-8bbf-4cc8-90bd-bfbb7d3580fb", // default paketId
      address: data.address ?? null,
      phone: data.phone ?? null,
    };

    return CompanyModel.create(payload);
  }

  /** Perbarui company berdasarkan ID */
  async updateCompany(id: string, data: CompanyUpdateDTO) {
    const company = await this.findById(id);
    if (!company) throw new AppError("Company tidak ditemukan", 404);

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
  async deleteCompany(id: string) {
    const company = await this.findById(id);
    if (!company) throw new AppError("Company tidak ditemukan", 404);

    await company.destroy();
    return company;
  }

  /** Cari company berdasarkan nama, jika tidak ada buat baru */
  async createIfNotExists(data: CompanyCreateDTO) {
    let company = await this.findByName(data.name);
    if (!company) {
      company = await this.create(data);
    }
    return company;
  }
}

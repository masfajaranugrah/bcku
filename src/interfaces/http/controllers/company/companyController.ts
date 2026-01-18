import { Request, Response } from "express";
import { CompanyUseCase } from "@application/usecase/company/companyUseCase";
import { CreateCompanyDTO, UpdateCompanyDTO } from "@application/dtos/CompanyDTO";
import { AppError } from "@shared/errors/AppError";

export class CompanyController {
  private useCase: CompanyUseCase;

  constructor() {
    this.useCase = new CompanyUseCase();

    // Bind methods agar bisa langsung dipakai di router
    this.createCompany = this.createCompany.bind(this);
    this.getAllCompanies = this.getAllCompanies.bind(this);
    this.getCompanyById = this.getCompanyById.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  // Buat company baru
  async createCompany(req: Request, res: Response) {
    try {
      const data: CreateCompanyDTO = req.body;

      // Validasi input sederhana
      if (!data.name) {
        throw new AppError("Nama company wajib diisi", 400);
      }

      const company = await this.useCase.createCompany(data);
      return res.status(201).json({
        message: "Company berhasil dibuat",
        data: company,
      });
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Ambil semua company
  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await this.useCase.getAllCompanies();
      return res.status(200).json(companies);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Ambil company berdasarkan ID
  async getCompanyById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError("ID company wajib diisi", 400);
      }
      const company = await this.useCase.getCompanyById(id);
      return res.status(200).json(company);
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update company
  async updateCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateCompanyDTO = req.body;
      if (!id) {
        throw new AppError("ID company wajib diisi", 400);
      }
      const updated = await this.useCase.updateCompany(id, data);
      return res.status(200).json({
        message: "Company berhasil diperbarui",
        data: updated,
      });
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Hapus company
  async deleteCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError("ID company wajib diisi", 400);
      }
      const deleted = await this.useCase.deleteCompany(id);
      return res.status(200).json({
        message: "Company berhasil dihapus",
        data: deleted,
      });
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Toggle status aktif company (ban/unban)
  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (!id) {
        throw new AppError("ID company wajib diisi", 400);
      }

      if (typeof isActive !== "boolean") {
        throw new AppError("isActive harus berupa boolean (true/false)", 400);
      }

      const updated = await this.useCase.toggleStatus(id, isActive);
      return res.status(200).json({
        message: isActive ? "Company berhasil diaktifkan" : "Company berhasil dinonaktifkan (banned)",
        data: updated,
      });
    } catch (err: any) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

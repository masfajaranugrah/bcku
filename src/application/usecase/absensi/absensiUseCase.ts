import { AbsensiRepository } from "@infrastructure/repositories/absensi/absensiRepository";
import { CreateAbsensiDTO, UpdateAbsensiDTO } from "@application/dtos/AbsensiDTO";
import { AppError } from "@shared/errors/AppError";

export class AbsensiUseCase {
  private repository: AbsensiRepository;

  constructor() {
    this.repository = new AbsensiRepository();
  }

  async createAbsensi(data: CreateAbsensiDTO) {
    const existing = await this.repository.findByUserAndDate(data.userId, data.tanggal, data.companyId);
    if (existing) throw new AppError("Absensi untuk hari ini sudah ada", 400);
    return await this.repository.createAbsensi(data);
  }


async getAbsensiByUserId(userId: string, companyId: string) {
  if (!companyId) throw new AppError("companyId harus diberikan", 400);

  const absensi = await this.repository.findById(userId, companyId);
  if (!absensi || absensi.length === 0) 
    throw new AppError("Data absensi tidak ditemukan", 404);

  return absensi;
}


  async getAllAbsensi(companyId?: string) {
    return await this.repository.getAllAbsensi(companyId);
  }

async updateAbsensi(id: string, data: any, companyId: string) {
  if (!companyId) throw new AppError("companyId harus diberikan", 400);

  const absensi = await this.repository.update(id, data, companyId);
 
  return absensi;
}

  async deleteAbsensi(id: string, companyId?: string) {
      if (!companyId) throw new AppError("companyId harus diberikan", 400);

    const existing = await this.repository.findById(id, companyId);
    if (!existing) throw new AppError("Data absensi tidak ditemukan", 404);
    return await this.repository.deleteAbsensi(id, companyId);
  }
}

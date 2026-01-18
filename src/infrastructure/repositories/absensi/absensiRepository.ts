import AbsensiModel from "@infrastructure/database/models/absensi/absensiModel";
import { CreateAbsensiDTO, UpdateAbsensiDTO } from "@application/dtos/AbsensiDTO";

export class AbsensiRepository {

async createAbsensi(data: CreateAbsensiDTO) {
    return await AbsensiModel.create(data);
}

async findById(userId: string, companyId: string) {
  if (!companyId) throw new Error("companyId harus diberikan");

  return await AbsensiModel.findAll({
    where: { 
      userId,
      companyId  
    },
  });
}


async findByUserAndDate(userId: string, tanggal: string, companyId: string) {
    return await AbsensiModel.findOne({ where: { userId, tanggal, companyId } });
}

async update(id: string, data: Partial<CreateAbsensiDTO>, companyId: string) {
  if (!companyId) throw new Error("companyId harus diberikan");

  // Hanya field yang ada di `data` yang akan diupdate
  const [updatedRows] = await AbsensiModel.update(data, {
    where: { id, companyId },
  });

  if (updatedRows === 0) return null;

  // Kembalikan data terbaru setelah update
  return await this.findById(id, companyId);
}

async getAllAbsensi(companyId?: string) {
    const where: any = {};
    if (companyId) where.companyId = companyId;
    return await AbsensiModel.findAll({ where, order: [["tanggal", "DESC"]] });
}

async deleteAbsensi(id: string, companyId?: string) {
    const where: any = { id };
    if (companyId) where.companyId = companyId;
    return await AbsensiModel.destroy({ where });
  }
}
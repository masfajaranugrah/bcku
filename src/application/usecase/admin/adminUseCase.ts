 import { AdminRespository } from "@infrastructure/repositories/admin/adminRespository";
import bcrypt from "bcryptjs";

export class AdminUseCase {
    constructor(private adminRespository: AdminRespository) {}

async getAllMembers(user: any) {
 
  if (!user) {
    throw new Error("Company ID tidak ditemukan");
  }
    // Panggil repository dengan companyId
  const members = await this.adminRespository.findUserAll(user);

  // Jika kosong, kembalikan array kosong, jangan lempar error
  return { status: "success", data: members || [] };
}




async getMemberById(id: string, companyId: string) {
    const member = await this.adminRespository.findByIdAndCompany(id, companyId);
    if (!member) throw new Error("Member tidak ditemukan");
    return { status: "success", data: member };
}


async updateMember(id: string, companyId: string, data: any) {
  const updateData: any = { ...data };

  // Jika ada password → hash dulu
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updated = await this.adminRespository.updateByIdAndCompany(
    id,
    companyId,
    updateData
  );

  return { status: "success", data: updated };
}


async deleteMember(id: string, companyId: string) {
    await this.adminRespository.deleteByIdAndCompany(id, companyId);
    return { status: "success", message: "Member berhasil dihapus" };
}

}

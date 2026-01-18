import { MemberRespository } from '@infrastructure/repositories/member/memberRespository';
import bcrypt from "bcryptjs";

export class MemberUseCase {
    constructor(private memberRespository: MemberRespository) {}

   async getAllMembers(companyId: string) {
    // ambil semua member berdasarkan companyId
    const members = await this.memberRespository.findUserAll({ companyId });

    if (!members || members.length === 0) {
      return { status: "success", data: [], message: "Belum ada member" };
    }

    return { status: "success", data: members };
  }

    async getMemberById(id: string) {
        const member = await this.memberRespository.findById(id);
        if (!member) throw new Error("Member tidak ditemukan");
        return { status: "success", data: member };
    }


async updateMember(id: string, data: any) {
  // Field yang boleh diupdate
  const allowedFields = ["firstName", "lastName", "email", "profilePicture", "password"];
  const updateData: any = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  // Jika update password → hash dulu
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const updated = await this.memberRespository.update(id, updateData);

  if (!updated) throw new Error("Gagal update member");

  return {
    status: "success",
    data: {
      id: updated.id,
      fullName: `${updated.firstName} ${updated.lastName}`,
      email: updated.email,
      profilePicture: updated.profilePicture,
      isVerified: updated.isVerified,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    },
  };
}


}

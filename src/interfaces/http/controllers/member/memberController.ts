import { MemberUseCase } from '@application/usecase/member/memberUseCase';
import { MemberRespository } from "@infrastructure/repositories/member/memberRespository";

const memberRespository = new MemberRespository();
const memberUseCase = new MemberUseCase(memberRespository);

export class memberController {
  
    // Ambil data profil member sendiri
    static async getMyProfile(req: any, res: any, next: any) {
        try {
            const member = await memberUseCase.getMemberById(req.user.id); // pakai id dari token
            return res.status(200).json(member);
        } catch (error) {
            next(error);
        }
    }

    // Update data member sendiri (tidak bisa update roleId)
static async updateMyProfile(req: any, res: any, next: any) {
  try {
    // Hapus roleId jika ada di body agar member tidak bisa ganti role
    const { roleId, ...data } = req.body;

    const updated = await memberUseCase.updateMember(req.user.id, data); 
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberController = void 0;
const memberUseCase_1 = require("@application/usecase/member/memberUseCase");
const memberRespository_1 = require("@infrastructure/repositories/member/memberRespository");
const memberRespository = new memberRespository_1.MemberRespository();
const memberUseCase = new memberUseCase_1.MemberUseCase(memberRespository);
class memberController {
    // Ambil data profil member sendiri
    static async getMyProfile(req, res, next) {
        try {
            const member = await memberUseCase.getMemberById(req.user.id); // pakai id dari token
            return res.status(200).json(member);
        }
        catch (error) {
            next(error);
        }
    }
    // Update data member sendiri (tidak bisa update roleId)
    static async updateMyProfile(req, res, next) {
        try {
            // Hapus roleId jika ada di body agar member tidak bisa ganti role
            const { roleId, ...data } = req.body;
            const updated = await memberUseCase.updateMember(req.user.id, data);
            return res.status(200).json(updated);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.memberController = memberController;
//# sourceMappingURL=memberController.js.map
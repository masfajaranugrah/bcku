"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class MemberUseCase {
    constructor(memberRespository) {
        this.memberRespository = memberRespository;
    }
    async getAllMembers(companyId) {
        // ambil semua member berdasarkan companyId
        const members = await this.memberRespository.findUserAll({ companyId });
        if (!members || members.length === 0) {
            return { status: "success", data: [], message: "Belum ada member" };
        }
        return { status: "success", data: members };
    }
    async getMemberById(id) {
        const member = await this.memberRespository.findById(id);
        if (!member)
            throw new Error("Member tidak ditemukan");
        return { status: "success", data: member };
    }
    async updateMember(id, data) {
        // Field yang boleh diupdate
        const allowedFields = ["firstName", "lastName", "email", "profilePicture", "password"];
        const updateData = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                updateData[field] = data[field];
            }
        }
        // Jika update password → hash dulu
        if (updateData.password) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        const updated = await this.memberRespository.update(id, updateData);
        if (!updated)
            throw new Error("Gagal update member");
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
exports.MemberUseCase = MemberUseCase;
//# sourceMappingURL=memberUseCase.js.map